"use client";
import { useFormik } from "formik";
import { useFreepikStore } from "../_store/freepikStore";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function SearchForm() {
  const { setTerm, term } = useFreepikStore();
  const { values, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      term,
    },
    onSubmit: (values) => {
      if (values.term.trim() !== term) {
        setTerm(values.term);
      }
    },
  });
  return (
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
  );
}
