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

  const steps = [
    {
      id: 1,
      name: "Your Info",
    },
    {
      id: 2,
      name: "Select Plan",
    },
    {
      id: 3,
      name: "Add-ons",
    },
    {
      id: 4,
      name: "Summary",
    },
  ];

  return (
    <div className="bg-blue-100 min-h-screen flex md:flex-col md:justify-center md:items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex-1 flex flex-col md:grid md:grid-cols-[auto_1fr] md:bg-white max-w-max md:flex-none md:gap-4 md:p-4 md:rounded-2xl"
      >
        <div className="bg-[url(/images/bg-sidebar-mobile.svg)] h-[180px] md:bg-[url(/images/bg-sidebar-desktop.svg)] bg-cover bg-no-repeat bg-center md:w-[276px] md:min-h-[600px] md:rounded-lg">
          <div className="flex md:flex-col justify-center items-center md:items-start gap-4 md:gap-8 m-8">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-4">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => setCurrentStep(step.id)}
                  className={`rounded-full size-8 md:size-9 flex justify-center items-center ${
                    currentStep === step.id
                      ? "bg-stepper-active text-black"
                      : "border-2 border-white text-white"
                  }`}
                >
                  {step.id}
                </button>
                <div className="hidden md:block uppercase">
                  <p className="text-gray-300 text-xs">step {step.id}</p>
                  <p className="text-white text-tiny tracking-tight font-bold">
                    {step.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          key={currentStep}
          className="grid grid-rows-[1fr_auto] flex-1 -mt-25 md:mt-0 md:py-10 lg:px-20"
        >
          <div>{!submitted ? renderStep() : <ThankYouStep />}</div>

          {/* button group */}
          {!submitted && (
            <div className="bg-white p-4 md:p-0 flex justify-between items-center">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-gray-500 hover:cursor-pointer active:translate-y-0.5 transition-all"
                >
                  Go Back
                </button>
              )}
              <button
                type="submit"
                className={`bg-primary text-white px-[1.375rem] py-3 font-medium rounded-lg hover:cursor-pointer hover:bg-primary/80 active:bg-primary/50 transform active:translate-y-0.5 transition-all ml-auto ${currentStep === 4 && "bg-secondary"}`}
              >
                {currentStep === 4 ? "Confirm" : "Next Step"}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
