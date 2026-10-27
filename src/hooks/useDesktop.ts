"use client";

import { useSyncExternalStore } from "react";

const query = "(min-width: 768px)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => null;

// Mount one presentation, rather than running a hidden second site beneath it.
export const useDesktop = () => useSyncExternalStore(subscribe, snapshot, serverSnapshot);
