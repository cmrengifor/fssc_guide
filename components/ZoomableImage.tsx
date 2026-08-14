"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/lang-context";

/** Reusable click-to-enlarge image: renders normally in place, and opens a
 *  full-screen overlay with the same image at full size on click. Used
 *  everywhere the app shows a real screenshot, so the modal behavior (Escape,
 *  backdrop click, focus trap, scroll lock, enter/exit animation) only needs
 *  to be built once. */
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
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const appRoot = document.getElementById("app");
    appRoot?.setAttribute("inert", "");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      appRoot?.removeAttribute("inert");
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!closing) return;
    const el = backdropRef.current;
    if (!el) return;
    function finish() {
      setVisible(false);
      setClosing(false);
      triggerRef.current?.focus();
    }
    function onAnimationEnd(e: AnimationEvent) {
      if (e.target !== el) return;
      finish();
    }
    el.addEventListener("animationend", onAnimationEnd);
    // Fallback in case the animation never fires an end event (e.g. a
    // backgrounded/throttled tab) — the modal must still close.
    const fallback = window.setTimeout(finish, 300);
    return () => {
      el.removeEventListener("animationend", onAnimationEnd);
      window.clearTimeout(fallback);
    };
  }, [closing]);

  function open() {
    setClosing(false);
    setVisible(true);
  }

  function close() {
    setClosing(true);
  }

  return (
    <>
      <button
        type="button"
        className="zoomable-image-trigger"
        onClick={open}
        ref={triggerRef}
        aria-label={`${t("imageEnlargeLabel")}: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} loading="lazy" />
      </button>
      {visible &&
        createPortal(
          <div
            ref={backdropRef}
            className={`image-modal-backdrop${closing ? " is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={close}
          >
            <div className="image-modal-frame" onClick={(e) => e.stopPropagation()}>
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
          </div>,
          document.body
        )}
    </>
  );
}
