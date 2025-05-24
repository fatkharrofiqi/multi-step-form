import { z } from "zod";

// Define plan type enum explicitly
export const planTypeEnum = z.enum(["arcade", "advanced", "pro"]);
export type PlanType = z.infer<typeof planTypeEnum>;

// Define plan data structure
export type Plan = {
  id: PlanType;
  name: string;
  monthly: number;
  yearly: number;
  icon: string;
};
