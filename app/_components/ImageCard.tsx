"use client";
import Image from "next/image";
import { DataImage } from "../types";
import { useFolderStore } from "../_store/folderStore";
import {
  FolderIcon,
  FolderMinusIcon,
  FolderArrowDownIcon,
} from "@heroicons/react/24/outline";

import DownloadButton from "./DownloadButton";

interface ImageCardProps {
  value: DataImage;
}
export default function ImageCard({ value }: ImageCardProps) {
  const { folders, addSelectedImage, deleteImage } = useFolderStore();

  return (
    <li className="group rounded-lg border relative break-inside-avoid mb-3">
      <Image
        src={value.image.source.url}
        alt={value.title}
        width={parseInt(value.image.source.size.split("x")[0])}
        height={parseInt(value.image.source.size.split("x")[1])}
        placeholder="empty"
        className="object-cover w-full rounded-lg"
      />
      <div className="flex gap-2 p-2 justify-between items-end transition duration-300 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none absolute top-0 rounded-lg w-full h-full bg-gradient-to-b to-black/50 from-black/0 opacity-0 text-white">
        <h3 className="w-full max-w-56 overflow-hidden overflow-ellipsis text-nowrap">
          {value.title}
        </h3>
        <div className="flex flex-col gap-1">
          {folders.some((folder) =>
            folder.selectedImages.some(
              (i) => i.title == value.title && i.author.id == value.author.id
            )
          ) && (
            <button
              className="p-2 bg-white border rounded-lg"
              onClick={() => deleteImage(value)}
            >
              <FolderMinusIcon className="size-5 w-full text-black" />
            </button>
          )}

          <DownloadButton idResource={value.id} />
          <button
            className="p-2 bg-white border rounded-lg text-black disabled:bg-neutral-200 disabled:text-black/70"
            disabled={!folders.some((folder) => folder.selectedForSaving)}
            onClick={() => addSelectedImage(value)}
          >
            {folders.some(
              (folder) =>
                folder.selectedImages.some(
                  (i) =>
                    i.title == value.title && i.author.id == value.author.id
                ) && folder.selectedForSaving
            ) ? (
              <FolderIcon className="size-5" />
            ) : (
              <FolderArrowDownIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
