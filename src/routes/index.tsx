import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

// Define plan type enum explicitly
const planTypeEnum = z.enum(["arcade", "advanced", "pro"]);
type PlanType = z.infer<typeof planTypeEnum>;

// Define plan data structure
type PlanData = {
  name: string;
  monthly: number;
  yearly: number;
};

// Define plans object type with specific keys
type Plans = {
  [key in PlanType]: PlanData;
};

// Define addon type enum and types
const addonTypeEnum = z.enum([
  "online-service",
  "larger-storage",
  "customizable-profile",
]);
type AddonType = z.infer<typeof addonTypeEnum>;

type AddonData = {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
};

type Addons = {
  [key in AddonType]: AddonData;
};

const formSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(/^\+?\d{1,4}?[-.\s]?\d{1,14}$/, "Invalid phone number"),
  }),
  plan: z.object({
    type: planTypeEnum,
    billing: z.enum(["monthly", "yearly"]),
  }),
  addons: z.array(addonTypeEnum).min(0),
});

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    defaultValues: {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
      },
      plan: { type: "arcade" as PlanType, billing: "monthly" },
      addons: ["online-service"],
    },
    onSubmit: async ({ value }) => {
      if (currentStep === 4) {
        console.log("Final submission:", value);
        // Handle final submission
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
    validators: {
      onChange: formSchema,
    },
  });

  const plans: Plans = {
    arcade: { name: "Arcade", monthly: 9, yearly: 90 },
    advanced: { name: "Advanced", monthly: 12, yearly: 120 },
    pro: { name: "Pro", monthly: 15, yearly: 150 },
  };

  const addons: Addons = {
    "online-service": {
      name: "Online service",
      description: "Access to multiplayer games",
      monthly: 1,
      yearly: 10,
    },
    "larger-storage": {
      name: "Larger storage",
      description: "Extra 1TB of cloud save",
      monthly: 2,
      yearly: 20,
    },
    "customizable-profile": {
      name: "Customizable profile",
      description: "Custom theme on your profile",
      monthly: 2,
      yearly: 20,
    },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
            <p className="font-bold text-2xl text-[#072850]">Personal info</p>
            <p className="text-gray-500 leading-5">
              Please provide your name, email, and phone number.
            </p>
            <div className="space-y-5">
              <form.Field name="personalInfo.name">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-blue-950 text-xs"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. Stephen King"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`placeholder:text-[0.9375rem] tracking-wide py-3.5 px-[0.9375rem] rounded-md border-2 ${
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-red-500 text-xs">
                        {field.state.meta.errors
                          .map((value) => value?.message)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name="personalInfo.email">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-blue-950 text-xs"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. stephenking@lorem.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`placeholder:text-[0.9375rem] tracking-wide py-3.5 px-[0.9375rem] rounded-md border-2 ${
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-red-500 text-xs">
                        {field.state.meta.errors
                          .map((value) => value?.message)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name="personalInfo.phone">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-blue-950 text-xs"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. +1 234 567 890"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`placeholder:text-[0.9375rem] tracking-wide py-3.5 px-[0.9375rem] rounded-md border-2 ${
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-red-500 text-xs">
                        {field.state.meta.errors
                          .map((value) => value?.message)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
            <p className="font-bold text-2xl text-[#072850]">
              Select your plan
            </p>
            <p className="text-gray-500 leading-5">
              You have the option of monthly or yearly billing.
            </p>
            <div className="space-y-5">
              <form.Field name="plan.type">
                {(field) => (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Object.entries(plans).map(([id, plan]) => (
                      <label
                        key={id}
                        className={`border-2 p-4 rounded-md cursor-pointer ${
                          field.state.value === id
                            ? "border-[#04285A] bg-[#EEF5FF]"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan.type"
                          value={id}
                          checked={field.state.value === id}
                          onChange={() => field.handleChange(id as PlanType)}
                          className="hidden"
                        />
                        <p className="font-bold">{plan.name}</p>
                        <p className="text-gray-500">
                          $
                          {form.state.values.plan.billing === "monthly"
                            ? plan.monthly
                            : plan.yearly}
                          /
                          {form.state.values.plan.billing === "monthly"
                            ? "mo"
                            : "yr"}
                        </p>
                      </label>
                    ))}
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-red-500 text-xs">
                        {field.state.meta.errors
                          .map((value) => value?.message)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name="plan.billing">
                {(field) => (
                  <div className="flex justify-center items-center gap-4 bg-[#F8F9FF] p-4 rounded-md">
                    <span
                      className={
                        field.state.value === "monthly"
                          ? "font-bold"
                          : "text-gray-500"
                      }
                    >
                      Monthly
                    </span>
                    <input
                      type="checkbox"
                      checked={field.state.value === "yearly"}
                      onChange={() =>
                        field.handleChange(
                          field.state.value === "monthly"
                            ? "yearly"
                            : "monthly",
                        )
                      }
                      className="toggle"
                    />
                    <span
                      className={
                        field.state.value === "yearly"
                          ? "font-bold"
                          : "text-gray-500"
                      }
                    >
                      Yearly
                    </span>
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
            <p className="font-bold text-2xl text-[#072850]">Pick add-ons</p>
            <p className="text-gray-500 leading-5">
              Add-ons help enhance your gaming experience.
            </p>
            <div className="space-y-4">
              <form.Field name="addons">
                {(field) => (
                  <div className="space-y-4">
                    {Object.entries(addons).map(([id, addon]) => (
                      <label
                        key={id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-md cursor-pointer ${
                          field.state.value.includes(id)
                            ? "border-[#04285A] bg-[#EEF5FF]"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={field.state.value.includes(id)}
                          onChange={() => {
                            const newAddons = field.state.value.includes(id)
                              ? field.state.value.filter(
                                  (addonId: string) => addonId !== id,
                                )
                              : [...field.state.value, id];
                            field.handleChange(newAddons);
                          }}
                          className="h-5 w-5"
                        />
                        <div>
                          <p className="font-bold">{addon.name}</p>
                          <p className="text-gray-500">{addon.description}</p>
                        </div>
                        <p className="ml-auto">
                          +$
                          {form.state.values.plan.billing === "monthly"
                            ? addon.monthly
                            : addon.yearly}
                          /
                          {form.state.values.plan.billing === "monthly"
                            ? "mo"
                            : "yr"}
                        </p>
                      </label>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        );
      case 4:
        const billing = form.state.values.plan.billing;
        const plan = plans[form.state.values.plan.type as PlanType];
        const selectedAddons = form.state.values.addons as AddonType[];
        const total =
          (billing === "monthly" ? plan.monthly : plan.yearly) +
          selectedAddons.reduce(
            (sum: number, addon: AddonType) =>
              sum +
              (billing === "monthly"
                ? addons[addon].monthly
                : addons[addon].yearly),
            0,
          );

        return (
          <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
            <p className="font-bold text-2xl text-[#072850]">Finishing up</p>
            <p className="text-gray-500 leading-5">
              Double-check everything looks OK before confirming.
            </p>
            <div className="bg-[#F8F9FF] p-4 rounded-md">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-bold">
                    {plan.name} ({billing === "monthly" ? "Monthly" : "Yearly"})
                  </p>
                  <button
                    type="button"
                    className="text-gray-500 underline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Change
                  </button>
                </div>
                <p className="font-bold">
                  ${billing === "monthly" ? plan.monthly : plan.yearly}/
                  {billing === "monthly" ? "mo" : "yr"}
                </p>
              </div>
              {selectedAddons.length > 0 && (
                <div className="pt-4 space-y-2">
                  {selectedAddons.map((addon: AddonType) => (
                    <div key={addon} className="flex justify-between">
                      <p className="text-gray-500">{addons[addon].name}</p>
                      <p>
                        +$
                        {billing === "monthly"
                          ? addons[addon].monthly
                          : addons[addon].yearly}
                        /{billing === "monthly" ? "mo" : "yr"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between px-4">
              <p className="text-gray-500">
                Total (per {billing === "monthly" ? "month" : "year"})
              </p>
              <p className="font-bold text-[#04285A]">
                +${total}/{billing === "monthly" ? "mo" : "yr"}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  console.table(form.state.values);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col bg-[#EEF5FF] min-h-screen"
    >
      {/* image */}
      <img src="/images/bg-sidebar-mobile.svg" alt="sidebar-mobile" />

      {/* form group */}
      <div className="relative -mt-36 flex-1 space-y-8">
        <div className="flex justify-center items-center gap-4">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(step)}
              className={`rounded-full size-8 flex justify-center items-center ${
                currentStep === step
                  ? "bg-[#BEE2FC] text-black"
                  : "border-2 border-white text-white"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        {renderStep()}
      </div>

      {/* button group */}
      <div className="bg-white p-4 flex justify-between items-center mt-auto">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-gray-500"
          >
            Go Back
          </button>
        )}
        <button
          type="button"
          onClick={() => form.handleSubmit()}
          className="bg-[#04285A] text-white p-4 rounded-lg hover:cursor-pointer hover:bg-[#04285A]/10 ml-auto"
        >
          {currentStep === 4 ? "Confirm" : "Next Step"}
        </button>
      </div>
    </form>
  );
}
