"use client";

import { Suspense, useEffect, useState } from "react";
import { useFreepikStore } from "../_store/freepikStore";
import { FreepikResources } from "../types";
import { getAllResources } from "../actions";
import ImageCard from "./ImageCard";
import { useApikeyStore } from "../_store/apikeyStore";

import { useSearchParams } from "next/navigation";
import ImagePagination from "./ImagePagination";
import clsx from "clsx";
import Toastify from "toastify-js";
import FolderSelectionButton from "./FolderSelectionButton";

export default function ImageGallery() {
  const { setLastPage, setLastQueryParams } = useFreepikStore();
  const { apikey } = useApikeyStore();
  const [freepikResources, setFreepikResources] = useState<FreepikResources>(
    {}
  );

  const searchParams = useSearchParams();
  const term = searchParams.get("term") ?? "";

  // Fetch de imágenes
  useEffect(() => {
    const fetchImages = async () => {
      if (!apikey) {
        setFreepikResources({});
        return;
      }
      const queryParams = searchParams.toString();
      console.log(queryParams);
      setLastQueryParams(`/?${queryParams}`);
      const result = await getAllResources(queryParams, apikey);
      if (result && !result.message) {
        const lastPage = result.meta?.last_page ?? 1;
        const realLastPage = Math.min(lastPage, 100);
        setLastPage(realLastPage);
        setFreepikResources(result);
      } else {
        Toastify({
          text: result.message,
          duration: 1000,
          style: {
            background: "#fef2f2",
            color: "#991b1b",
          },
        }).showToast();
      }
    };

    fetchImages();
  }, [apikey, setLastPage, searchParams, setLastQueryParams]);

  return (
    <div className="py-2 px-5 flex justify-center w-full">
      <div
        className={clsx(
          "flex flex-col gap-2 w-full text-neutral-700 ",
          !apikey && "hidden"
        )}
      >
        <div className="flex justify-between py-3">
          <h2 className="text-xl ">
            Mostrando resultados&nbsp;
            {term && <strong className="text-black">{term}</strong>}
          </h2>
          <div className="relative">
            <FolderSelectionButton />
          </div>
        </div>
        <Suspense>
          <ImagePagination meta={freepikResources.meta} />
        </Suspense>
        {freepikResources.data?.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            No se encontraron resultados
          </div>
        ) : (
          <>
            {" "}
            <ul className="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-3">
              {freepikResources.data?.map((value) => (
                <ImageCard value={value} key={value.id} />
              ))}
            </ul>
            <Suspense>
              <ImagePagination meta={freepikResources.meta} />
            </Suspense>
          </>
        )}
      </div>

      <p className={clsx(apikey && "hidden")}>
        Ingresa el API key para empezar.
      </p>
    </div>
  );
}
