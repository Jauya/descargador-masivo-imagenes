"use client";

import { useEffect, useState } from "react";
import { useFreepikStore } from "../_store/freepikStore";
import { FreepikResources } from "../types";
import { getAllResources } from "../actions";
import ImageCard from "./ImageCard";
import { useApikeyStore } from "../_store/apikeyStore";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

export default function ImageGallery() {
  const { term, setTerm, page, setPage, setLastPage, lastPage } =
    useFreepikStore();
  const { apikey } = useApikeyStore();
  const [result, setFreepikResources] = useState<FreepikResources>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener valores iniciales de los query params
  const initialPage = Math.max(
    parseInt(searchParams.get("page") || "1", 10),
    1
  );
  const initialTerm = searchParams.get("term") || "";

  // Sincronizar estados con los query params
  useEffect(() => {
    if (term !== initialTerm) setTerm(initialTerm);
    if (page !== initialPage) setPage(initialPage > 100 ? 100 : initialPage);
  }, [initialTerm, initialPage, term, page, setTerm, setPage]);

  // Fetch de imágenes
  useEffect(() => {
    const fetchImages = async () => {
      if (!apikey) {
        setFreepikResources({});
        return;
      }

      const result = await getAllResources(term, apikey, page);
      if (result && !result.message) {
        const lastPage =
          (result.meta && result.meta.last_page >= 100
            ? 100
            : result.meta?.last_page) || 1;
        setLastPage(lastPage);
        setFreepikResources(result);
      }
    };

    fetchImages();
  }, [apikey, term, page, setLastPage]);

  // Formik para manejar la paginación
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: { page: initialPage > 100 ? 100 : initialPage },
    onSubmit: (values) => {
      const newPage = Math.min(Math.max(values.page, 1), lastPage); // Asegurar límites
      if (newPage !== page) {
        router.replace(`?term=${term}&page=${newPage}`); // Evita añadir historial extra
      }
    },
  });

  return (
    <div className="py-2 flex justify-center w-full">
      {apikey ? (
        <div className="flex flex-col gap-2 w-full text-neutral-700">
          <h2 className="text-xl">
            Mostrando resultados{" "}
            {term && <strong className="text-black">{term}</strong>}
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <PhotoIcon className="size-4" />
                <strong>Imágenes</strong>
              </div>
              {result.meta?.total}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="disabled:opacity-70"
                disabled={page == 1}
                onClick={() => {
                  setFieldValue("page", 1);
                  router.replace(`?term=${term}&page=1`, { scroll: false });
                }}
              >
                <ChevronDoubleLeftIcon className="size-5" />
              </button>
              <button
                className="disabled:opacity-70"
                disabled={page == 1}
                onClick={() => {
                  setFieldValue("page", page - 1);
                  router.replace(`?term=${term}&page=${page - 1}`, {
                    scroll: false,
                  });
                }}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              {lastPage == page && page - 2 > 0 && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page - 2);
                      router.replace(`?term=${term}&page=${page - 2}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page - 2}
                  </button>
                </>
              )}
              {page > 1 && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page - 1);
                      router.replace(`?term=${term}&page=${page - 1}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page - 1}
                  </button>
                </>
              )}

              <button className="flex justify-center items-center rounded-full bg-neutral-300 size-9 text-sm font-medium">
                {page}
              </button>
              {lastPage - 1 >= page && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page + 1);
                      router.replace(`?term=${term}&page=${page + 1}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page + 1}
                  </button>
                </>
              )}
              {page == 1 && page + 2 <= lastPage && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page + 2);
                      router.replace(`?term=${term}&page=${page + 2}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page + 2}
                  </button>
                </>
              )}
              <button
                className="disabled:opacity-70"
                disabled={page == lastPage}
                onClick={() => {
                  setFieldValue("page", page + 1);
                  router.replace(`?term=${term}&page=${page + 1}`, {
                    scroll: false,
                  });
                }}
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <button
                className="disabled:opacity-70"
                disabled={page == lastPage}
                onClick={() => {
                  setFieldValue("page", lastPage);
                  router.replace(`?term=${term}&page=${lastPage}`);
                }}
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
              de {lastPage || 1}
            </form>
          </div>

          <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-3">
            {result.data?.map((value) => (
              <ImageCard value={value} key={value.id} />
            ))}
          </ul>

          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <PhotoIcon className="size-4" />
                <strong>Imágenes</strong>
              </div>
              {result.meta?.total}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="disabled:opacity-70"
                disabled={page == 1}
                onClick={() => {
                  setFieldValue("page", 1);
                  router.replace(`?term=${term}&page=1`, { scroll: false });
                }}
              >
                <ChevronDoubleLeftIcon className="size-5" />
              </button>
              <button
                className="disabled:opacity-70"
                disabled={page == 1}
                onClick={() => {
                  setFieldValue("page", page - 1);
                  router.replace(`?term=${term}&page=${page - 1}`, {
                    scroll: false,
                  });
                }}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              {lastPage == page && page - 2 > 0 && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page - 2);
                      router.replace(`?term=${term}&page=${page - 2}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page - 2}
                  </button>
                </>
              )}
              {page > 1 && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page - 1);
                      router.replace(`?term=${term}&page=${page - 1}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page - 1}
                  </button>
                </>
              )}

              <button className="flex justify-center items-center rounded-full bg-neutral-300 size-9 text-sm font-medium">
                {page}
              </button>
              {lastPage - 1 >= page && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page + 1);
                      router.replace(`?term=${term}&page=${page + 1}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page + 1}
                  </button>
                </>
              )}
              {page == 1 && page + 2 <= lastPage && (
                <>
                  <button
                    className="flex justify-center items-center rounded-full bg-neutral-100 size-9 text-sm font-medium hover:bg-neutral-200"
                    onClick={() => {
                      setFieldValue("page", page + 2);
                      router.replace(`?term=${term}&page=${page + 2}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {page + 2}
                  </button>
                </>
              )}
              <button
                className="disabled:opacity-70"
                disabled={page == lastPage}
                onClick={() => {
                  setFieldValue("page", page + 1);
                  router.replace(`?term=${term}&page=${page + 1}`, {
                    scroll: false,
                  });
                }}
              >
                <ChevronRightIcon className="size-5" />
              </button>
              <button
                className="disabled:opacity-70"
                disabled={page == lastPage}
                onClick={() => {
                  setFieldValue("page", lastPage);
                  router.replace(`?term=${term}&page=${lastPage}`);
                }}
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
              de {lastPage || 1}
            </form>
          </div>
        </div>
      ) : (
        <p>Ingresa el API key para empezar.</p>
      )}
    </div>
  );
}
