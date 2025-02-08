"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { downloadResource, getBlobImage } from "../actions";
import { useApikeyStore } from "../_store/apikeyStore";
import Tostify from "toastify-js";
import { DataImage } from "../types";
interface DownloadButtonProps {
  resource: DataImage;
}
export default function DownloadButton({ resource }: DownloadButtonProps) {
  const { apikey } = useApikeyStore();
  const handleSubmit = async () => {
    const dataDownload = await downloadResource(resource, apikey);
    console.log(dataDownload);
    if (dataDownload.data) {
      const blob = await getBlobImage(dataDownload.data.url);
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = dataDownload.data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } else {
      Tostify({
        text: dataDownload.message,
        duration: 1000,
        style: {
          background: "#fef2f2",
          color: "#991b1b",
        },
      }).showToast();
    }
  };
  return (
    <button
      onClick={handleSubmit}
      className="p-2 bg-white border rounded-lg text-black disabled:bg-neutral-200 disabled:text-black/70"
      disabled={!apikey}
    >
      <ArrowDownTrayIcon className="size-5 w-full " />
    </button>
  );
}
