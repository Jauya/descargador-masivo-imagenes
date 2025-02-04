"use client";

import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useFolderStore } from "../_store/folderStore";
import Folder from "./Folder";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

export default function Folders() {
  const { folders } = useFolderStore();
  const [isCreate, setIsCreate] = useState(false);
  const folderRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { createFolder } = useFolderStore();
  const {
    handleSubmit,
    handleChange,
    resetForm,
    values: { folderName },
  } = useFormik({
    initialValues: {
      folderName: "",
    },
    onSubmit: () => {
      createFolder(folderName);
      setIsCreate(false);
    },
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCreate(false);
      }
    };
    if (isCreate) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCreate, resetForm]);

  useEffect(() => {
    if (isCreate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreate]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-medium">Carpetas</h1>
        <button
          className="flex contrast-125 items-center py-1.5 px-3 gap-2 rounded-lg bg-blue-600 text-blue-50"
          ref={buttonRef}
          onClick={() => setIsCreate(true)}
        >
          Crear <PlusIcon className="size-5" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
        {folders.map((folder) => (
          <Folder key={folder.name} value={folder} />
        ))}

        {isCreate && (
          <div
            ref={folderRef}
            className="bg-neutral-100 rounded-lg p-2 w-full flex items-center relative"
          >
            <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
              <FolderIcon className="size-6" />
              <input
                className="text-lg outline-none w-2/3 bg-transparent"
                type="text"
                ref={inputRef}
                autoComplete="off"
                id="folderName"
                name="folderName"
                onChange={handleChange}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
