"use client";
import { CodeBracketIcon } from "@heroicons/react/16/solid";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "./ui/Modal";
import { useApikeyStore } from "../_store/apikeyStore";
import { useFormik } from "formik";
import { useState } from "react";
import { validateKey } from "../actions";
import Toastify from "toastify-js";

export default function ApiKeyForm() {
  const { apikey, setApikey } = useApikeyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { handleSubmit, handleChange, resetForm, errors, touched, values } =
    useFormik({
      initialValues: {
        apikey: useApikeyStore.getState().apikey,
      },
      validate: (values) => {
        if (values.apikey.length !== 36) {
          return { apikey: "Clave no valida." };
        }

        return {};
      },
      onSubmit: async (values, actions) => {
        const result = await validateKey(values.apikey);
        if (!result) {
          actions.setErrors({ apikey: "Clave no valida." });
        } else {
          setApikey(values.apikey);
          Toastify({
            text: "Validación de clave exitosa.",
            duration: 1000,
            close: true,
            style: {
              background: "#f0fdf4",
              color: "#16a34a",
            },
          }).showToast();
          closeModal();
        }
      },
    });
  return (
    <div className="flex gap-1 items-center">
      {apikey ? (
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex rounded-lg bg-neutral-100 w-full shadow-lg">
            <input
              className="w-full bg-transparent outline-none px-4 py-2 my-2"
              type="password"
              name="apikey"
              value={values.apikey}
              placeholder="Pega la clave aqui..."
              autoComplete="off"
              onChange={handleChange}
              disabled={!!apikey}
              required
            />
            {apikey ? (
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
    </div>
  );
}
