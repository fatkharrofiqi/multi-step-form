import { formSubscription } from "@/components/form/shared-form";
import { AddonsStep } from "@/components/form/step/addons";
import FinishingStep from "@/components/form/step/finishing";
import { PersonalInfoStep } from "@/components/form/step/personal-info";
import { PlansStep } from "@/components/form/step/plans";
import ThankYouStep from "@/components/form/step/thank-you";
import { useAppForm } from "@/hooks/form";
import type { Plan } from "@/model/plan";
import type { Addon } from "@/model/type";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const plans: Plan[] = [
  {
    id: "arcade",
    name: "Arcade",
    monthly: 9,
    yearly: 90,
    icon: "/images/icon-arcade.svg",
  },
  {
    id: "advanced",
    name: "Advanced",
    monthly: 12,
    yearly: 120,
    icon: "/images/icon-advanced.svg",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 15,
    yearly: 150,
    icon: "/images/icon-pro.svg",
  },
];

const addons: Addon[] = [
  {
    id: "online-service",
    name: "Online service",
    description: "Access to multiplayer games",
    monthly: 1,
    yearly: 10,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthly: 2,
    yearly: 20,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthly: 2,
    yearly: 20,
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useAppForm({
    ...formSubscription,
    onSubmit: async ({ value }) => {
      if (currentStep === 4) {
        console.log("Final submission:", value);
        setSubmitted(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <PlansStep form={form} plans={plans} />;
      case 3:
        return <AddonsStep form={form} addons={addons} />;
      case 4:
        const billing = form.state.values.plan.billing;
        const plan = plans.find((p) => p.id === form.state.values.plan.type)!;
        const selectedAddons = addons.filter((addon) =>
          form.state.values.addons.includes(addon.id),
        );

        const total =
          (billing === "monthly" ? plan.monthly : plan.yearly) +
          selectedAddons.reduce(
            (sum: number, addon: Addon) =>
              sum + (billing === "monthly" ? addon.monthly : addon.yearly),
            0,
          );

        return (
          <FinishingStep
            plan={plan}
            total={total}
            billing={billing}
            onChange={(step: number) => setCurrentStep(step)}
            selectedAddons={selectedAddons}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col bg-blue-100 min-h-screen"
    >
      {/* image */}
      <img src="/images/bg-sidebar-mobile.svg" alt="sidebar-mobile" />

      {/* form group */}
      <div key={currentStep} className="relative -mt-36 flex-1 space-y-8">
        <div className="flex justify-center items-center gap-4">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              type="button"
              disabled={submitted}
              onClick={() => setCurrentStep(step)}
              className={`rounded-full size-8 flex justify-center items-center ${
                currentStep === step
                  ? "bg-stepper-active text-black"
                  : "border-2 border-white text-white"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        {!submitted ? renderStep() : <ThankYouStep />}
      </div>

      {/* button group */}
      {!submitted && (
        <div className="bg-white p-4 flex justify-between items-center mt-auto">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-gray-500 hover:cursor-pointer"
            >
              Go Back
            </button>
          )}
          <button
            type="submit"
            className={`bg-primary text-white px-[1.375rem] py-3 font-medium rounded-lg hover:cursor-pointer hover:bg-primary/80 active:bg-primary/50 transform duration-200 active:translate-y-1.5 transition-all ml-auto ${currentStep === 4 && "bg-secondary"}`}
          >
            {currentStep === 4 ? "Confirm" : "Next Step"}
          </button>
        </div>
      )}
    </form>
  );
}
