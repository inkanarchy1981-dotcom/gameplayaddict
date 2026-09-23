"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

export type AdSlotKind =
  | "MOBILE_INLINE"
  | "DESKTOP_INLINE"
  | "ARTICLE_MID"
  | "ARTICLE_LATE"
  | "CONTENT_BREAK"
  | "DESKTOP_RAIL"
  | "ANCHOR_ELIGIBLE";

export function AdSlot({ kind, enabled = false }: { kind: AdSlotKind; enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("adPreview") === "1";
    if ((!enabled && !preview) || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) track("ad_slot_view_candidate", { kind });
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, kind]);

  return (
    <div ref={ref} className={`ad-slot ad-slot--${kind.toLowerCase()} ${enabled ? "ad-slot--enabled" : ""}`} aria-label="Advertisement">
      <span>Advertisement</span><small>Reserved ad space</small>
    </div>
  );
}
