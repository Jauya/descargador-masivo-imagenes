"use client";
import React from "react";
import Popover from "./ui/Popover";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useFolderStore } from "../_store/folderStore";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

export default function FolderSelectionButton() {
  const { folders, createFolder, deleteFolder, selectFolderForSaving } =
    useFolderStore();
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
    <Popover
      className="right-0 top-10 border w-full p-2"
      buttonClassName="flex justify-center items-center p-2 gap-2 rounded-lg"
      buttonContent={
        <>
          <FolderArrowDownIcon className="size-6 min-w-fit text-black" />{" "}
          Seleccionar carpetas
        </>
      }
    >
      <div className="flex flex-col justify-between text-black h-full">
        <div className="flex flex-col gap-[5.3px] h-fit overflow-y-auto pb-1">
          {folders.map((folder) => (
            <label
              key={folder.name}
              htmlFor={folder.name}
              className={"flex justify-between items-center gap-1 text-sm"}
            >
              <div
                className={clsx(
                  "flex justify-between items-center px-2 py-1 gap-1 rounded-lg border w-full",
                  folder.selectedForSaving && "bg-neutral-100"
                )}
              >
                <div>
                  <input
                    className="outline-none sr-only"
                    onChange={() => selectFolderForSaving(folder.name)}
                    checked={folder.selectedForSaving}
                    type="checkbox"
                    id={folder.name}
                  />
                  <span className="overflow-x-hidden text-ellipsis">
                    {folder.name}
                  </span>
                </div>
                <span>{folder.selectedImages.length}</span>
              </div>
              <button
                className={clsx(
                  "cursor-pointer p-1.5 h-full rounded-lg border",
                  folder.selectedForSaving && "bg-neutral-100"
                )}
              >
                <MinusIcon
                  className="size-4"
                  onClick={() => deleteFolder(folder.name)}
                />
              </button>
            </label>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
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
  );
}
