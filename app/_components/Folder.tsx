"use client";

import { EllipsisVerticalIcon, FolderIcon } from "@heroicons/react/24/outline";
import { Folder as IFolder, useFolderStore } from "../_store/folderStore";
import Popover from "./ui/Popover";
import Modal from "./ui/Modal";
import { useState } from "react";
import Image from "next/image";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/16/solid";
import DownloadFolderButton from "./DownloadFolderButton";

interface FolderProps {
  value: IFolder;
}
export default function Folder({ value }: FolderProps) {
  const { deleteFolder, deleteImage } = useFolderStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const resourceIds = value.selectedImages.length
    ? value.selectedImages.map((item) => item.id)
    : [];
  return (
    <>
      <div className="bg-neutral-100 rounded-lg w-full flex items-center justify-between relative cursor-pointer">
        <div
          onClick={openModal}
          className="w-full flex gap-2 items-center justify-between p-2"
        >
          <div className="flex gap-2 text-lg">
            <FolderIcon className="size-6" />
            <h2 className="select-none">{value.name}</h2>
          </div>
          <span className=" select-none text-lg">
            {value.selectedImages.length}
          </span>
        </div>
        <Popover
          className="-right-3 top-8 h-fit"
          buttonClassName="p-2 w-10 h-full flex justify-center items-center"
          icon={
            <EllipsisVerticalIcon className="size-5 min-w-fit text-black" />
          }
        >
          <div className="grid">
            <button
              className="flex p-2 text-red-700 hover:bg-neutral-50"
              onClick={() => deleteFolder(value.name)}
            >
              Eliminar
            </button>
          </div>
        </Popover>
      </div>
      <Modal
        modalClassName="max-sm:max-w-[400px] max-w-5xl max-h-[700px]"
        title={value.name}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div className="columns-1 sm:columns-3 md:columns-4 gap-2 bg-neutral-100 rounded-lg p-3 border max-w-screen-lg w-full overflow-y-auto">
          {value.selectedImages.length ? (
            value.selectedImages.map((item) => (
              <div className="mb-2 break-inside-avoid" key={item.id}>
                <Image
                  onDoubleClick={() => {
                    deleteImage(item, value.name);
                  }}
                  className="w-full object-cover rounded-lg shadow-2xl"
                  src={item.image.source.url}
                  alt={item.title}
                  width={300}
                  height={300}
                />
              </div>
            ))
          ) : (
            <div>
              <p>Aun no hay imagenes</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            className="flex gap-2 text-red-600"
            onClick={() => deleteFolder(value.name)}
          >
            <TrashIcon className="size-5" /> Eliminar carpeta
          </button>
          <DownloadFolderButton
            icon={<ArrowDownTrayIcon className="size-5" />}
            className="flex gap-2 px-5 py-2 rounded-lg bg-blue-600 disabled:opacity-70 saturate-150 text-blue-50 shadow-md"
            folderName={value.name}
            resourceIds={resourceIds}
          />
        </div>
      </Modal>
    </>
  );
}
