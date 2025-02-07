"use client";
import { useFormik } from "formik";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const term = searchParams.get("term") ?? "";

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: { term },
    enableReinitialize: true,
    onSubmit: (values) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.term.trim() !== term) {
        params.set("term", values.term);
        params.set("page", "1");
      }
      if (searchParams.toString() !== params.toString()) {
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-2 p-2 rounded-lg bg-neutral-100 border"
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
        <button type="button" onClick={() => setFieldValue("term", "")}>
          <XMarkIcon className="size-5 w-fit px-3 mr-2 border-r border-r-neutral-400 text-neutral-700" />
        </button>
      )}

      <button
        type="submit"
        className="flex justify-center items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-blue-50 rounded-md text-sm"
      >
        <MagnifyingGlassIcon className="size-5" /> Buscar
      </button>
    </form>
  );
}
