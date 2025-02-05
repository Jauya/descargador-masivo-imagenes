"use server";

import { FreepikDownload, FreepikResources } from "./types";

const url = "https://api.freepik.com/v1/resources";
export const getAllResources = async (
  term: string,
  apikey: string,
  page: number
) => {
  try {
    const queryParams = `page=${page}&limit=50&filters[content_type][photo]=1&filters[license][freemium]=1&term=${term}`;
    const res = await fetch(`${url}?${queryParams}`, {
      headers: {
        "x-freepik-api-key": apikey,
      },
    });
    const result: FreepikResources = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error del servidor" };
  }
};

export const validateKey = async (apikey: string) => {
  try {
    const res = await fetch(`${url}?limit=1`, {
      headers: {
        "x-freepik-api-key": apikey,
      },
    });
    const result: FreepikResources = await res.json();
    if (result.data && result.data.length !== 1) {
      return false;
    }
    return true;
  } catch (error) {
    if (error) return false;
  }
};

export const downloadResource = async (id: number, apikey: string) => {
  try {
    const res = await fetch(`${url}/${id}/download?image_size=medium`, {
      headers: {
        "x-freepik-api-key": apikey,
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
