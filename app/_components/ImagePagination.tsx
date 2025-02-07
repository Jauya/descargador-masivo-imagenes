"use client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useFreepikStore } from "../_store/freepikStore";
import { Meta } from "../types";
import { getFormattedNumber } from "../utils";

interface ImagePaginationProps {
  meta: Meta | undefined;
}
export default function ImagePagination({ meta }: ImagePaginationProps) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const { lastPage } = useFreepikStore();

  const router = useRouter();

  // Formik para manejar la paginación
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      page: Math.min(page, 100),
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const newPage = Math.min(Math.max(values.page, 1), lastPage); // Asegurar límites
      if (newPage !== page) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.replace(`?${params.toString()}`, { scroll: false }); // Evita añadir historial extra
      }
    },
  });

  const goToPage = (newPage: number) => {
    newPage = Math.min(Math.max(newPage, 1), lastPage);
    setFieldValue("page", newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!meta) return null;
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1">
          <PhotoIcon className="size-4" />
          <strong>Imágenes</strong>
        </div>
        {getFormattedNumber(meta.total)}
      </div>
      <div className="flex items-center gap-2">
        {/* Ir a primera página */}
        <button
          className="disabled:opacity-70"
          disabled={page === 1}
          onClick={() => goToPage(1)}
        >
          <ChevronDoubleLeftIcon className="size-5" />
        </button>

        {/* Página anterior */}
        <button
          className="disabled:opacity-70"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeftIcon className="size-5" />
        </button>

        {/* Mostrar páginas anteriores si aplica */}
        {page > 2 && (
          <button
            className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
            onClick={() => goToPage(page - 2)}
          >
            {page - 2}
          </button>
        )}

        {page > 1 && (
          <button
            className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
            onClick={() => goToPage(page - 1)}
          >
            {page - 1}
          </button>
        )}

        {/* Página actual */}
        <button className="flex justify-center items-center rounded-full bg-neutral-300 size-9 text-sm font-medium">
          {page}
        </button>

        {/* Mostrar siguientes páginas si aplica */}
        {page < lastPage && (
          <button
            className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
            onClick={() => goToPage(page + 1)}
          >
            {page + 1}
          </button>
        )}

        {page + 2 <= lastPage && (
          <button
            className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
            onClick={() => goToPage(page + 2)}
          >
            {page + 2}
          </button>
        )}

        {/* Página siguiente */}
        <button
          className="disabled:opacity-70"
          disabled={page === lastPage}
          onClick={() => goToPage(page + 1)}
        >
          <ChevronRightIcon className="size-5" />
        </button>

        {/* Ir a última página */}
        <button
          className="disabled:opacity-70"
          disabled={page === lastPage}
          onClick={() => goToPage(lastPage)}
        >
          <ChevronDoubleRightIcon className="size-5" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-1 items-center text-sm font-medium text-neutral-500"
      >
        Página
        <input
          className="w-[60px] outline-none border rounded-lg pl-3 p-1"
          name="page"
          onChange={handleChange}
          value={values.page}
          type="number"
          min={1}
          max={lastPage}
        />
        de {lastPage}
      </form>
    </div>
  );
}
