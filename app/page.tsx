"use client";
import { Suspense } from "react";
import ImageGallery from "./_components/ImageGallery";
export default function Home() {
  return (
    <div className="flex gap-3 items-center px-5 py-3">
      <Suspense fallback={<p>Cargando...</p>}>
        <ImageGallery />
      </Suspense>
    </div>
  );
}
