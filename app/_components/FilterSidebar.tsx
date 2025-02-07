"use client";
import {
  AdjustmentsHorizontalIcon,
  ArrowPathRoundedSquareIcon,
  CheckBadgeIcon,
  CheckIcon,
  FunnelIcon,
  SquaresPlusIcon,
  SwatchIcon,
} from "@heroicons/react/16/solid";
import FilterOption from "./FilterOption";
import { filterOptions } from "../_config/filterOptions";
import { capitalizeFirstLetter } from "../utils";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const setOrderParams = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrder = searchParams.get("order") ?? "relevance";

    params.set("page", "1");
    if (currentOrder == null || currentOrder !== order) {
      params.set("order", order);
    }
    router.replace(`?${params}`);
  };

  const setContentTypeParams = (contentType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentContentType = params.get(
      `filters[content_type][${contentType}]`
    );

    params.set("page", "1");
    filterOptions.filters.content_type.forEach((cType) => {
      params.delete(`filters[content_type][${cType}]`);
    });
    if (currentContentType == null) {
      params.set(`filters[content_type][${contentType}]`, "1");
    }
    router.replace(`?${params}`);
  };

  const setLicenseParams = (license: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentLicense = params.get(`filters[license][${license}]`);

    params.set("page", "1");
    filterOptions.filters.license.forEach((l) => {
      params.delete(`filters[license][${l}]`);
    });
    if (currentLicense == null) {
      params.set(`filters[license][${license}]`, "1");
    }
    router.replace(`?${params}`);
  };

  const setOrientationParams = (orientation: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrientation = params.get(
      `filters[orientation][${orientation}]`
    );

    params.set("page", "1");
    filterOptions.filters.orientation.forEach((o) => {
      params.delete(`filters[orientation][${o}]`);
    });

    if (currentOrientation == null) {
      params.set(`filters[orientation][${orientation}]`, "1");
    }
    router.replace(`?${params}`);
  };

  const setColorParams = (color: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentColor = params.get("filters[color]");

    params.set("page", "1");
    if (currentColor == null || currentColor !== color) {
      params.set("filters[color]", color);
    } else {
      params.delete("filters[color]");
    }

    router.replace(`?${params}`);
  };

  if (pathname == "/folders") return null;

  return (
    <div className="sticky top-32 min-w-72 w-72 h-full ">
      <h2 className="flex items-center gap-2 text-lg border-b py-4 px-5">
        <AdjustmentsHorizontalIcon className="size-5" /> Filtros
      </h2>
      <div className="flex flex-col py-4 px-5 gap-6 text-sm ">
        <FilterOption
          title="Ordenar por:"
          icon={<FunnelIcon className="size-4" />}
        >
          {filterOptions.order.map((order) => {
            const isChecked =
              (searchParams.get("order") ?? "relevance") === order;
            return (
              <label
                key={order}
                htmlFor={order}
                className="text-sm py-2 px-3 rounded-md has-[:checked]:bg-blue-500 has-[:checked]:text-white border"
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="order"
                  onChange={() => setOrderParams(order)}
                  checked={isChecked}
                  value={order}
                  id={order}
                />
                &nbsp;
                {order == "relevance" ? "Más relevante" : "Reciente"}
              </label>
            );
          })}
        </FilterOption>
        <FilterOption
          title="Tipo de recurso"
          icon={<SquaresPlusIcon className="size-4" />}
        >
          {filterOptions.filters.content_type.map((contentType) => {
            const isChecked =
              searchParams.get(`filters[content_type][${contentType}]`) === "1";
            return (
              <label
                key={contentType}
                htmlFor={contentType}
                className="text-sm py-2 px-3 rounded-md has-[:checked]:bg-blue-500 has-[:checked]:text-white border"
              >
                <input
                  className="sr-only"
                  type="checkbox"
                  name={contentType}
                  checked={isChecked}
                  onChange={() => setContentTypeParams(contentType)}
                  id={contentType}
                />
                {capitalizeFirstLetter(contentType)}
              </label>
            );
          })}
        </FilterOption>
        <FilterOption
          title="Licencia"
          icon={<CheckBadgeIcon className="size-4" />}
        >
          {filterOptions.filters.license.map((license) => {
            const isChecked =
              searchParams.get(`filters[license][${license}]`) === "1";
            return (
              <label
                key={license}
                htmlFor={license}
                className="text-sm py-2 px-3 rounded-md has-[:checked]:bg-blue-500 has-[:checked]:text-white border"
              >
                <input
                  className="sr-only"
                  type="checkbox"
                  name={license}
                  onChange={() => setLicenseParams(license)}
                  checked={isChecked}
                  value={license}
                  id={license}
                />
                {license == "freemium" ? "Gratis" : "Premium"}
              </label>
            );
          })}
        </FilterOption>
        <FilterOption
          title="Orientación"
          icon={<ArrowPathRoundedSquareIcon className="size-4" />}
        >
          {filterOptions.filters.orientation.map((orientation) => {
            const isChecked =
              searchParams.get(`filters[orientation][${orientation}]`) === "1";
            return (
              <label
                key={orientation}
                htmlFor={orientation}
                className="text-sm py-2 px-3 rounded-md has-[:checked]:bg-blue-500 has-[:checked]:text-white border"
              >
                <input
                  className="sr-only"
                  type="checkbox"
                  name={orientation}
                  onChange={() => setOrientationParams(orientation)}
                  checked={isChecked}
                  value={orientation}
                  id={orientation}
                />
                &nbsp;
                {orientation == "landscape"
                  ? "Paisaje"
                  : orientation == "portrait"
                  ? "Retrato"
                  : orientation == "square"
                  ? "Cuadrado"
                  : orientation == "panoramic"
                  ? "Panorámico"
                  : ""}
              </label>
            );
          })}
        </FilterOption>
        <FilterOption title="Color" icon={<SwatchIcon className="size-4" />}>
          {filterOptions.filters.color.map((color) => {
            const isChecked = searchParams.get("filters[color]") === color;
            return (
              <label
                key={color}
                htmlFor={color}
                className="text-sm rounded-md border"
              >
                <input
                  className="sr-only peer/color"
                  type="checkbox"
                  name={color}
                  onChange={() => setColorParams(color)}
                  checked={isChecked}
                  value={color}
                  id={color}
                />
                <div
                  className={clsx(
                    color == "black"
                      ? "peer-checked/color:!text-white text-black bg-black"
                      : color == "white"
                      ? "peer-checked/color:!text-black text-white bg-white"
                      : color == "blue"
                      ? "peer-checked/color:!text-white text-blue-500 bg-blue-500"
                      : color == "gray"
                      ? "peer-checked/color:!text-white text-neutral-500 bg-neutral-500"
                      : color == "green"
                      ? "peer-checked/color:!text-white text-green-500 bg-green-500"
                      : color == "orange"
                      ? "peer-checked/color:!text-white text-orange-500 bg-orange-500"
                      : color == "red"
                      ? "peer-checked/color:!text-white text-red-500 bg-red-500"
                      : color == "yellow"
                      ? "peer-checked/color:!text-white text-yellow-500 bg-yellow-500"
                      : color == "purple"
                      ? "peer-checked/color:!text-white text-purple-500 bg-purple-500"
                      : color == "cyan"
                      ? "peer-checked/color:!text-white text-cyan-500 bg-cyan-500"
                      : color == "pink"
                      ? "peer-checked/color:!text-white text-pink-500 bg-pink-500"
                      : "",
                    " rounded-md size-8 flex justify-center items-center cursor-pointer"
                  )}
                >
                  <CheckIcon className="size-4" />
                </div>
              </label>
            );
          })}
        </FilterOption>
      </div>
    </div>
  );
}
