"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first render, then true after hydration.
 * Uses useSyncExternalStore so it never calls setState inside an effect.
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
