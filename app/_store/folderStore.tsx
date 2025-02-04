import { create } from "zustand";
import { DataImage } from "../types";
import { persist } from "zustand/middleware";

interface FreepikStore {
  folders: Folder[];
  createFolder: (name: string) => void;
  deleteFolder: (name: string) => void;
  selectFolderForSaving: (name: string) => void;
  addSelectedImage: (selectedImage: DataImage) => void;
  deleteImage: (image: DataImage, folderName?: string) => void;
}
export interface Folder {
  name: string;
  selectedImages: DataImage[];
  selectedForSaving: boolean;
}

export const useFolderStore = create<FreepikStore>()(
  persist(
    (set) => ({
      folders: [],
      createFolder: (name) =>
        set((state) => {
          const exists = state.folders.some((folder) => folder.name == name);
          return exists
            ? {}
            : {
                folders: [
                  ...state.folders,
                  {
                    name,
                    selectedImages: [],
                    selectedForSaving: false,
                  },
                ],
              };
        }),
      deleteFolder: (name) =>
        set((state) => ({
          folders: [...state.folders.filter((folder) => folder.name !== name)],
        })),
      selectFolderForSaving: (name) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.name !== name
              ? folder
              : folder.selectedForSaving
              ? { ...folder, selectedForSaving: false }
              : { ...folder, selectedForSaving: true }
          ),
        })),
      addSelectedImage: (selectedImage) =>
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.selectedForSaving &&
            !folder.selectedImages.some(
              (value) =>
                selectedImage.title == value.title &&
                value.author.id == value.author.id
            )
              ? {
                  ...folder,
                  selectedImages: [...folder.selectedImages, selectedImage],
                }
              : folder
          ),
        })),
      deleteImage: (image, folderName) =>
        set((state) => ({
          folders: state.folders.map((folder) => {
            // Verificar si la imagen está en el folder
            const hasImage = folder.selectedImages.some(
              (value) =>
                value.title === image.title &&
                value.author.id === image.author.id
            );

            // Si se proporciona folderName, solo modificar ese folder
            if (folderName) {
              if (folder.name === folderName && hasImage) {
                return {
                  ...folder,
                  selectedImages: folder.selectedImages.filter(
                    (value) =>
                      value.title !== image.title ||
                      value.author.id !== image.author.id
                  ),
                };
              }
              return folder;
            }

            // Si no se proporciona folderName, modificar todos los folders que contengan la imagen
            if (hasImage) {
              return {
                ...folder,
                selectedImages: folder.selectedImages.filter(
                  (value) =>
                    value.title !== image.title ||
                    value.author.id !== image.author.id
                ),
              };
            }

            return folder;
          }),
        })),
    }),
    { name: "image-folders-store" }
  )
);
