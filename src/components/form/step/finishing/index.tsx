import type { Plan } from "@/model/plan";
import type { Addon, BillingType } from "@/model/type";

interface FinishingStepProps {
  plan: Plan;
  total: number;
  billing: BillingType;
  onChange: (step: number) => void;
  selectedAddons: Addon[];
}

export default function FinishingStep({
  plan,
  total,
  billing,
  onChange,
  selectedAddons,
}: FinishingStepProps) {
  return (
    <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
      <p className="font-bold text-2xl text-primary">Finishing up</p>
      <p className="text-gray-500 leading-5">
        Double-check everything looks OK before confirming.
      </p>
      <div className="bg-[#F8F9FF] p-4 rounded-md">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <p className="font-bold text-primary">
              {plan.name} ({billing === "monthly" ? "Monthly" : "Yearly"})
            </p>
            <button
              type="button"
              className="text-gray-500 underline"
              onClick={() => onChange(2)}
            >
              Change
            </button>
          </div>
          <p className="font-bold text-primary">
            ${billing === "monthly" ? plan.monthly : plan.yearly}/
            {billing === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        {selectedAddons.length > 0 && (
          <div className="pt-4 space-y-2">
            {selectedAddons.map((addon, index) => (
              <div key={`index+${index + 1}`} className="flex justify-between">
                <p className="text-gray-500">{addon.name}</p>
                <p className="text-primary">
                  {billing === "monthly"
                    ? `+$${addon.monthly}/mo`
                    : `+$${addon.yearly}/yr`}
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
        <p className="font-bold text-secondary">
          +${total}/{billing === "monthly" ? "mo" : "yr"}
        </p>
      </div>
    </div>
  );
}
