import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  modalClassName?: string;
}
export default function Modal({
  modalClassName,
  isOpen,
  onClose,
  title,
  children,
  className,
}: Readonly<ModalProps>) {
  if (!isOpen) return null;
  return createPortal(
    <div
      className={clsx(
        "absolute top-0 left-0 w-full h-screen bg-black/5 flex justify-center items-center p-5 ",
        className
      )}
    >
      <div
        className={clsx(
          "bg-white p-5 rounded-2xl border flex flex-col gap-5 w-full ",
          modalClassName
        )}
      >
        <div className="flex w-full justify-center items-center relative">
          <h2 className="select-none text-center font-medium text-xl">
            {title}
          </h2>
          <XMarkIcon
            className="cursor-pointer absolute right-0 size-5"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
