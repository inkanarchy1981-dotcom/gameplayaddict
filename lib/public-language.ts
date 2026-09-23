import type { EvidenceState } from "./types";

export const publicEvidenceLabel: Record<EvidenceState, string> = {
  OFFICIAL_CONFIRMED: "Confirmed by Rockstar",
  OFFICIAL_OBSERVED: "Shown in official footage",
  SUPPORTED_INFERENCE: "Supported by official material",
  UNCONFIRMED: "Not confirmed yet",
  COMMUNITY_SUBMITTED: "Reported by the community",
  DISPUTED: "Still disputed",
  UNKNOWN: "Not confirmed yet",
};

export function evidenceLabel(state: EvidenceState) {
  return publicEvidenceLabel[state];
}
