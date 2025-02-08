"use client";
import { getBlobImage, downloadResource } from "../actions";
import { useApikeyStore } from "../_store/apikeyStore";
import { ReactNode, useState } from "react";
import * as zip from "@zip.js/zip.js"; // Importa zip.js
import Tostify from "toastify-js";
import { DataImage } from "../types";

interface DownloadFolderButtonProps {
  resources: DataImage[];
  folderName: string;
  className: string;
  icon?: ReactNode;
}

export default function DownloadFolderButton({
  resources,
  folderName,
  className,
  icon,
}: DownloadFolderButtonProps) {
  const { apikey } = useApikeyStore();
  const [downloaded, setDownloaded] = useState(0);
  const [messageButton, setMessageButton] = useState("Descargar todo");

  const handleSubmit = async () => {
    setMessageButton("Descargando...");
    const writer = new zip.ZipWriter(new zip.BlobWriter("application/zip"));
    let downloadedCount = 0; // Variable local para rastrear el conteo real

    for (let i = 0; i < resources.length; i++) {
      const idResource = resources[i].id;
      try {
        const dataDownload = await downloadResource(resources[i], apikey);

        if (dataDownload.data) {
          const blob = await getBlobImage(dataDownload.data.url);
          if (!blob) {
            console.error(`Error al descargar el recurso ${idResource}`);
            continue;
          }

          downloadedCount++; // Actualiza la variable local
          setDownloaded(downloadedCount); // Actualiza el estado para la UI

          await writer.add(
            dataDownload.data.filename,
            new zip.BlobReader(blob)
          );
        } else {
          Tostify({
            text: dataDownload.message,
            duration: 1000,
            style: {
              background: "#fef2f2",
              color: "#991b1b",
            },
          }).showToast();

          if (
            dataDownload.message?.includes("daily limit") ||
            dataDownload.message?.includes("Unauthorized")
          ) {
            break;
          }
          setDownloaded(i + 1);
          continue;
        }
      } catch (error) {
        console.error(`Error descargando el recurso ${idResource}:`, error);
      }
    }
    if (downloadedCount > 0) {
      // Generar el ZIP con el conteo real (variable local)
      const zipBlob = await writer.close();
      const blobUrl = window.URL.createObjectURL(zipBlob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${folderName}-images-${downloadedCount}.zip`; // Usa la variable local
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }

    setMessageButton("Descargar todo");
    setDownloaded(0);
  };

  return (
    <button
      className={className}
      onClick={handleSubmit}
      disabled={!resources.length || !apikey}
    >
      {icon}
      {messageButton}&nbsp;{downloaded == 0 ? "" : downloaded}
    </button>
  );
}
