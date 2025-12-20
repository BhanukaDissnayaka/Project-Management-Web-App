export const CardPriorities = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export type CardPriorityType = keyof typeof CardPriorities;

export const CardStatuses = {
  NEW: "NEW",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
} as const;

export type CardStatusType = keyof typeof CardStatuses;
