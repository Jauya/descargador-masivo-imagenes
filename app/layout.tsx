import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "toastify-js/src/toastify.css";
import Navbar from "./_components/Navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Descargador de Imagenes",
  description: "Descagador masivo de imagenes de Freepik",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
