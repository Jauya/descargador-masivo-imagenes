"use server";

import { FreepikDownload, FreepikResources } from "./types";

const url = "https://api.freepik.com/v1/resources/";
export const getAllResources = async (queryParams: string, apikey: string) => {
  try {
    console.log(queryParams);
    const res = await fetch(`${url}?${queryParams}`, {
      headers: {
        "x-freepik-api-key": apikey,
        "Accept-Language": "es-ES",
      },
    });
    const result: FreepikResources = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error del servidor" };
  }
};

export const downloadResource = async (id: number, apikey: string) => {
  try {
    const res = await fetch(`${url}${id}/download?image_size=medium`, {
      headers: {
        "x-freepik-api-key": apikey,
        "Accept-Language": "es-ES",
      },
    });
    const result: FreepikDownload = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error del servidor" };
  }
};

export const getBlobImage = async (url: string) => {
  const res = await fetch(url);
  return res.blob();
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
