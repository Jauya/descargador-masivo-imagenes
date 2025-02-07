"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
interface PopoverProps {
  children: ReactNode;
  buttonContent: ReactNode;
  className: string;
  buttonClassName: string;
}

const Popover = ({
  children,
  buttonContent,
  buttonClassName,
  className,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const togglePopover = () => {
    setVisible(!isVisible);
  };

  // Cerrar el Popover al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setVisible]);

  return (
    <>
      <div
        ref={popoverRef}
        className={clsx(
          "absolute rounded-lg z-30 mt-2 bg-white shadow-md overflow-hidden transition-opacity duration-300",
          className,
          isVisible ? " opacity-100" : " opacity-0 pointer-events-none"
        )}
      >
        {children}
      </div>
      <button
        ref={buttonRef}
        onClick={togglePopover}
        className={clsx(
          buttonClassName,
          isVisible ? " bg-neutral-100 rounded-lg" : ""
        )}
      >
        {buttonContent}
      </button>
    </>
  );
};

export default Popover;
