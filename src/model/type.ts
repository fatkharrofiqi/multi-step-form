import { z } from "zod";

// Define addon type enum and types
export const billingEnum = z.enum(["monthly", "yearly"]);
export type BillingType = z.infer<typeof billingEnum>;

export const addonTypeEnum = z.enum([
  "online-service",
  "larger-storage",
  "customizable-profile",
]);
export type AddonType = z.infer<typeof addonTypeEnum>;

export type Addon = {
  id: AddonType;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
};
