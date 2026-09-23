import type { AnalyticsEventName } from "./types";

export function track(event: AnalyticsEventName, payload: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("gameplayaddict:analytics", { detail: { event, payload, at: Date.now() } }));
}
