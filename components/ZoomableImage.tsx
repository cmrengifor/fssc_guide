"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/** Reusable click-to-enlarge image: renders normally in place, and opens a
 *  full-screen modal with the same image at a larger size on click. Used
 *  everywhere the app shows a real screenshot, so the modal behavior (Escape,
 *  backdrop click, focus trap, scroll lock) only needs to be built once. */
export default function ZoomableImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const appRoot = document.getElementById("app");
    appRoot?.setAttribute("inert", "");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      appRoot?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        type="button"
        className="zoomable-image-trigger"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        aria-label={`${t("imageEnlargeLabel")}: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} loading="lazy" />
      </button>
      {open && (
        <div className="image-modal-backdrop" onClick={close}>
          <div
            className="image-modal"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="image-modal-close"
              onClick={close}
              ref={closeRef}
              aria-label={t("imageCloseLabel")}
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="image-modal-img" />
          </div>
        </div>
      )}
    </>
  );
}
