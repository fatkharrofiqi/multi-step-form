import { type PlanType, planTypeEnum } from "@/model/plan";
import { type BillingType, addonTypeEnum, billingEnum } from "@/model/type";
import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

export const formSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(/^\+?\d{1,4}?[-.\s]?\d{1,14}$/, "Invalid phone number"),
  }),
  plan: z.object({
    type: planTypeEnum,
    billing: billingEnum,
  }),
  addons: z.array(addonTypeEnum).min(0),
});

export const formSubscription = formOptions({
  defaultValues: {
    personalInfo: {
      name: "aldo",
      email: "aldo@al.com",
      phone: "081231",
    },
    plan: {
      type: "arcade" as PlanType,
      billing: "monthly" as BillingType,
    },
    addons: ["online-service"],
  },
  validators: {
    onChange: formSchema,
  },
});
