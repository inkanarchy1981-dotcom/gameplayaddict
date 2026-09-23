export type LocalPlaybook = {
  savedDiscoveries: string[];
  favorites: string[];
  ownedVehicles: string[];
  missions: string[];
  collectibles: string[];
  goals: string[];
  updatedAt: string;
};

const storageKey = "gameplayaddict:playbook:v1";
const emptyPlaybook: LocalPlaybook = { savedDiscoveries: [], favorites: [], ownedVehicles: [], missions: [], collectibles: [], goals: [], updatedAt: "" };

export const localProgressRepository = {
  read(): LocalPlaybook {
    if (typeof window === "undefined") return emptyPlaybook;
    try { return { ...emptyPlaybook, ...JSON.parse(localStorage.getItem(storageKey) ?? "{}") }; } catch { return emptyPlaybook; }
  },
  write(next: LocalPlaybook) {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }));
  },
  migrationTarget: "Account-backed Postgres profile after login is justified by cross-device retention.",
};

export const moderatedDiscoveryWorkflow = ["SUBMISSION", "EVIDENCE", "DUPLICATE_CHECK", "MODERATION", "VERIFICATION", "PUBLICATION", "ENTITY_UPDATE", "MAP_UPDATE", "ASSISTANT_AVAILABILITY"] as const;
