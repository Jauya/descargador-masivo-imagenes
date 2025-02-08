"use server";

import { DataImage, FreepikDownload, FreepikResources } from "./types";
import { createRequestOptions } from "./utils";
const url = "https://api.freepik.com/v1/resources/";
export const getAllResources = async (queryParams: string, apikey: string) => {
  try {
    const requestOptions = createRequestOptions(apikey);
    const res = await fetch(`${url}?${queryParams}`, requestOptions);
    const result: FreepikResources = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error del servidor" };
  }
};

export const downloadResource = async (resource: DataImage, apikey: string) => {
  try {
    const requestOptions = createRequestOptions(apikey);
    let res;
    if (resource.image.type !== "photo") {
      res = await fetch(`${url}${resource.id}/download/jpg`, requestOptions);
    } else {
      res = await fetch(
        `${url}${resource.id}/download/?image_size=medium`,
        requestOptions
      );
    }
    const result: FreepikDownload = await res.json();
    if (Array.isArray(result.data)) result.data = result.data[0];

    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error del servidor" };
  }
};

export const getBlobImage = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return await res.blob();
  } catch (error) {
    console.error("Error al obtener la imagen en blob:", error);
    throw error;
  }
};

export const validateKey = async (apikey: string) => {
  try {
    const res = await fetch(`${url}?limit=1`, {
      headers: {
        "x-freepik-api-key": apikey,
        "Accept-Language": "es-ES",
      },
    });
    const result: FreepikResources = await res.json();
    if (result.data && result.data.length == 1) {
      return true;
    }
    return false;
  } catch (error) {
    if (error) return false;
  }
};
