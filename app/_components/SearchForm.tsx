"use client";
import { useFormik } from "formik";
import { useFreepikStore } from "../_store/freepikStore";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") || "");

  const { term } = useFreepikStore();

  useEffect(() => {
    setSearchTerm(searchParams.get("term") || "");
  }, [searchParams]); // Se ejecuta cada vez que cambia la URL

  const { values, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: { term: searchTerm },
    enableReinitialize: true, // Permite que los valores iniciales cambien dinámicamente
    onSubmit: (values) => {
      if (values.term.trim() !== term) {
        router.replace(`?term=${values.term}&page=1`, { scroll: false });
      }
    },
  });

  return (
    <Suspense>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-4 p-2 rounded-lg bg-neutral-100 border"
      >
        <MagnifyingGlassIcon className="size-5 min-w-fit my-2 text-neutral-700" />
        <input
          className="p-1 outline-none w-full bg-transparent"
          type="text"
          name="term"
          autoComplete="off"
          value={values.term}
          onChange={handleChange}
        />
        {values.term && (
          <button type="button" onClick={() => resetForm()}>
            <XMarkIcon className="size-5 w-fit px-3 border-r border-r-neutral-400 text-neutral-700" />
          </button>
        )}

        <button
          type="submit"
          className="flex justify-center items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-blue-50 rounded-md text-sm"
        >
          <MagnifyingGlassIcon className="size-5" /> Buscar
        </button>
      </form>
    </Suspense>
  );
}
