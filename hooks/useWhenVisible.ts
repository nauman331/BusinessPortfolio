"use client";

import { useEffect, useState } from "react";

/** true once the tab is visible (immediately if it already is) */
export function useWhenVisible() {
  const [ready, setReady] = useState(() =>
    typeof document !== "undefined" ? document.visibilityState === "visible" : false,
  );

  useEffect(() => {
    if (ready) {
      return;
    }
    const onChange = () => {
      if (document.visibilityState === "visible") {
        setReady(true);
        document.removeEventListener("visibilitychange", onChange);
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [ready]);

  return ready;
}