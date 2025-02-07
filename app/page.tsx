"use client";
import { Suspense } from "react";
import ImageGallery from "./_components/ImageGallery";
import FilterSideBar from "./_components/FilterSidebar";

export default function Home() {
  return (
    <div className="w-full flex">
      <Suspense>
        <FilterSideBar />
      </Suspense>
      <div className="w-full flex border-l">
        <Suspense>
          <ImageGallery />
        </Suspense>
      </div>
    </div>
  );
}
