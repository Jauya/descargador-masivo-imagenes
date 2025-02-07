"use client";
import Image from "next/image";
import SearchForm from "./SearchForm";
import Link from "next/link";
import { FolderIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useFreepikStore } from "../_store/freepikStore";
import ApiKeyForm from "./ApiKeyForm";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const { lastQueryParams } =
    useFreepikStore();
  return (
    <div
      className={clsx(
        "w-full z-20 sticky top-0 flex flex-col gap-2 px-5 py-3 bg-white border-b ",
        pathname == "/folders" ? "" : "h-32"
      )}
    >
      <div className="flex justify-between items-center">
        <Link href={lastQueryParams}>
          <Image
            className="contrast-150 aspect-auto w-auto h-auto"
            src="/freepik.svg"
            alt="freepik logo"
            width={160}
            height={44}
            priority
          />
        </Link>
        <div className="flex justify-center items-center gap-2">
          <ApiKeyForm />
          <Link
            className="flex gap-2 items-center border rounded-lg px-4 py-2 text-neutral-700"
            href="/folders"
          >
            <FolderIcon className="size-6" />
            Carpetas
          </Link>
        </div>
      </div>
      {pathname == "/" && (
        <Suspense>
          <SearchForm />
        </Suspense>
      )}
    </div>
  );
}
