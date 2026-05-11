"use client";

import { useEffect } from "react";

function isEmbeddedPage() {
  let framed = false;
  try {
    framed = window.self !== window.top;
  } catch {
    framed = true;
  }

  const params = new URLSearchParams(window.location.search);
  return framed || params.get("embed") === "1" || params.get("webcake") === "1";
}

export function EmbeddedScrollbarMode() {
  useEffect(() => {
    if (!isEmbeddedPage()) return;

    document.documentElement.dataset.embedded = "true";
    return () => {
      delete document.documentElement.dataset.embedded;
    };
  }, []);

  return null;
}
