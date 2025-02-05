"use client";
import Image from "next/image";
import SearchForm from "./SearchForm";
import Link from "next/link";
import { ExclamationCircleIcon, FolderIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { CodeBracketIcon } from "@heroicons/react/16/solid";
import Modal from "./ui/Modal";
import { useState } from "react";
import { useFormik } from "formik";
import { validateKey } from "../actions";
import { useApikeyStore } from "../_store/apikeyStore";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { delay } from "../utils";
import { useFreepikStore } from "../_store/freepikStore";

export default function Navbar() {
  const pathname = usePathname();

  const { apikey: apiKey, setApikey } = useApikeyStore();
  const { term, page, lastSearch, setLastSearch } = useFreepikStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    handleSubmit,
    handleChange,
    resetForm,
    errors,
    touched,
    values: { apikey },
  } = useFormik({
    initialValues: {
      apikey: useApikeyStore.getState().apikey,
    },
    validate: (values) => {
      if (values.apikey.length !== 36) {
        return { apikey: "Token no valido." };
      }

      return {};
    },
    onSubmit: async (values, actions) => {
      const result = await validateKey(values.apikey);
      if (!result) {
        actions.setErrors({ apikey: "Token no valido." });
      } else {
        setApikey(values.apikey);
        await delay(1000);
        closeModal();
      }
    },
  });
  return (
    <div className="z-20 sticky top-0 flex flex-col gap-2 px-5 py-3 bg-white border-b">
      <div className="flex justify-between items-center">
        <Link href={lastSearch}>
          <Image
            className="contrast-150 aspect-auto w-auto h-auto"
            src="/freepik.svg"
            alt="freepik logo"
            width={160}
            height={44}
            priority
          />
        </Link>
        <div className="flex justify-center items-center gap-2">
          {apiKey ? (
            <CheckCircleIcon className="size-5 text-green-600" />
          ) : (
            <ExclamationCircleIcon className="size-5" />
          )}

          <button
            onClick={openModal}
            className="flex gap-2 items-center border rounded-lg px-4 py-2 text-neutral-700"
          >
            <CodeBracketIcon className="size-6" /> API key
          </button>
          <Modal
            modalClassName="max-w-xl"
            className="z-30"
            title="API key"
            onClose={closeModal}
            isOpen={isModalOpen}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <div className="flex rounded-lg bg-neutral-100 w-full shadow-lg">
                <input
                  className="w-full bg-transparent outline-none px-4 py-2 my-2"
                  type="password"
                  name="apikey"
                  value={apikey}
                  placeholder="Pega la clave aqui..."
                  autoComplete="off"
                  onChange={handleChange}
                  disabled={!!apiKey}
                  required
                />
                {apiKey ? (
                  <button
                    type="reset"
                    onClick={() => {
                      setApikey("");
                      resetForm({ values: { apikey: "" } });
                    }}
                    className="font-medium bg-blue-50/50 hover:bg-blue-50 saturate-150 text-blue-600 border border-blue-600 rounded-lg sm:px-10 px-5 py-2 m-2"
                  >
                    Cambiar
                  </button>
                ) : (
                  <button
                    className="font-medium bg-blue-600 hover:bg-blue-700 saturate-150 border border-blue-600 text-white rounded-lg sm:px-10 px-5 py-2 m-2"
                    type="submit"
                  >
                    Validar
                  </button>
                )}
              </div>
              {errors.apikey && touched.apikey ? (
                <div className="p-2 bg-red-50 text-red-700/80 rounded-lg">
                  {errors.apikey}
                </div>
              ) : null}
            </form>
          </Modal>
          <Link
            className="flex gap-2 items-center border rounded-lg px-4 py-2 text-neutral-700"
            onClick={() =>
              pathname !== "/folders" &&
              setLastSearch(`/?term=${term}&page=${page}`)
            }
            href="/folders"
          >
            <FolderIcon className="size-6" />
            Carpetas
          </Link>
        </div>
      </div>
      {pathname == "/" && <SearchForm />}
    </div>
  );
}
