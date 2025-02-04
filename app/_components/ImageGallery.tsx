"use client";

import { useEffect, useState } from "react";
import { useFreepikStore } from "../_store/freepikStore";
import { DataImage } from "../types";
import { getAllResources } from "../actions";
import ImageCard from "./ImageCard";
import { useApikeyStore } from "../_store/apikeyStore";

export default function ImageGallery() {
  const { term } = useFreepikStore();
  const { apikey } = useApikeyStore();
  const [images, setImages] = useState<DataImage[]>([]);
  useEffect(() => {
    const getImages = async () => {
      if (apikey) {
        const dataImages = await getAllResources(term, apikey);
        setImages(dataImages);
      } else {
        setImages([]);
      }
    };
    getImages();
  }, [term, apikey]);
  return (
    <div className="py-2">
      {apikey ? (
        <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-3">
          {images?.map((value) => (
            <ImageCard value={value} key={value.id} />
          ))}
        </ul>
      ) : (
        <p>Ingresa el API key para empezar.</p>
      )}
    </div>
  );
}
