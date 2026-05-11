"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;

  let framed = false;
  try {
    framed = window.self !== window.top;
  } catch {
    framed = true;
  }

  const params = new URLSearchParams(window.location.search);
  return framed || params.get("embed") === "1" || params.get("webcake") === "1";
}

export function useIsEmbedded() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
