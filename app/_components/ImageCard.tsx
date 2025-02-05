"use client";
import Image from "next/image";
import { DataImage } from "../types";
import Popover from "./ui/Popover";
import { useFolderStore } from "../_store/folderStore";
import {
  FolderIcon,
  FolderMinusIcon,
  PlusIcon,
  FolderPlusIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import clsx from "clsx";
import DownloadButton from "./DownloadButton";

interface ImageCardProps {
  value: DataImage;
}
export default function ImageCard({ value }: ImageCardProps) {
  const {
    folders,
    createFolder,
    deleteFolder,
    addSelectedImage,
    selectFolderForSaving,
    deleteImage,
  } = useFolderStore();
  const {
    handleSubmit,
    handleChange,
    values: { folderName },
    resetForm,
  } = useFormik({
    initialValues: { folderName: "" },
    onSubmit: () => {
      if (folderName.trim()) {
        createFolder(folderName);
      }
      resetForm();
    },
  });
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
          <div className="flex flex-col-reverse justify-between items-center bg-white hover:bg-gray-50 rounded-lg text-black relative">
            <button
              className="w-full p-2 pt-1 disabled:bg-neutral-300 disabled:text-neutral-800/70 rounded-b-lg"
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
                <FolderPlusIcon className="size-5" />
              )}
            </button>
            <Popover
              className="bottom-0 right-10 w-40 h-[152px] p-2"
              buttonClassName="flex justify-center items-center p-2 pb-1"
              icon={
                <AdjustmentsHorizontalIcon className="size-5 min-w-fit text-black" />
              }
            >
              <div className="flex flex-col justify-between text-black h-full">
                <div className="flex flex-col gap-[5.3px] h-fit overflow-y-auto pb-1">
                  {folders.map((folder) => (
                    <label
                      onDoubleClick={() => deleteFolder(folder.name)}
                      key={folder.name}
                      htmlFor={folder.name + value.id}
                      className={clsx(
                        "flex justify-between items-center px-2 py-1 gap-1 text-sm rounded-lg border mr-1",
                        folder.selectedForSaving &&
                          "bg-neutral-200 border-neutral-200"
                      )}
                    >
                      <div>
                        <input
                          className="outline-none sr-only"
                          onChange={() => selectFolderForSaving(folder.name)}
                          checked={folder.selectedForSaving}
                          type="checkbox"
                          id={folder.name + value.id}
                        />
                        <span className="overflow-x-hidden text-ellipsis">
                          {folder.name}
                        </span>
                      </div>
                      <span>{folder.selectedImages.length}</span>
                    </label>
                  ))}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-1"
                >
                  <input
                    className="w-full outline-none py-1 px-2 text-sm border rounded-lg"
                    type="text"
                    name="folderName"
                    onChange={handleChange}
                    autoComplete="off"
                    value={folderName}
                    required
                  />
                  <button
                    className="border p-1.5 rounded-lg hover:bg-neutral-100"
                    type="submit"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </form>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </li>
  );
}
