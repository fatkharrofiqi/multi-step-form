import { withForm } from "@/hooks/form";
import type { Plan } from "@/model/plan";
import { twMerge } from "tailwind-merge";
import Input from "../../input";
import Label from "../../label";
import { formSubscription } from "../../shared-form";

export const PlansStep = withForm({
  ...formSubscription,
  props: {
    plans: [] as Plan[],
  },
  render: ({ form, plans }) => {
    return (
      <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
        <p className="font-bold text-2xl text-primary">Select your plan</p>
        <p className="text-gray-500 leading-5">
          You have the option of monthly or yearly billing.
        </p>
        <div className="space-y-5">
          <form.Field name="plan.type">
            {(field) => (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                  <Label
                    htmlFor={plan.id}
                    key={plan.id}
                    className={`border-2 p-4 rounded-md cursor-pointer flex items-center gap-4 ${field.state.value === plan.id ? "border-primary bg-white" : "border-gray-300"}`}
                  >
                    <img
                      src={plan.icon}
                      alt={plan.name}
                      width={"40px"}
                      height={"40px"}
                    />
                    <div className="flex flex-col gap-0.5">
                      <Input
                        type="radio"
                        id={plan.id}
                        name={field.name}
                        value={plan.id}
                        checked={field.state.value === plan.id}
                        onChange={() => field.handleChange(plan.id)}
                        className="hidden"
                      />
                      <p className="font-bold">{plan.name}</p>
                      <form.Subscribe
                        selector={(state) => state.values.plan.billing}
                      >
                        {(billing) => (
                          <>
                            <p className="text-gray-500 text-tiny">
                              {billing === "monthly"
                                ? `$${plan.monthly}/mo`
                                : `$${plan.yearly}/yr`}
                            </p>
                            <p className="text-primary text-xs font-light">
                              {billing === "yearly" && "2 months free"}
                            </p>
                          </>
                        )}
                      </form.Subscribe>
                    </div>
                  </Label>
                ))}
                {field.state.meta.errors.length > 0 && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.map((value) => value).join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="plan.billing">
            {(field) => (
              <div className="flex justify-center items-center gap-4 bg-[#F8F9FF] p-4 rounded -md select-none">
                <span
                  className={twMerge(
                    field.state.value === "monthly"
                      ? "font-bold text-gray-900"
                      : "font-normal text-gray-500",
                    "w-20 text-center",
                  )}
                >
                  Monthly
                </span>

                <label className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                  <input
                    type="checkbox"
                    id={field.name}
                    checked={field.state.value === "yearly"}
                    onChange={() =>
                      field.handleChange(
                        field.state.value === "monthly" ? "yearly" : "monthly",
                      )
                    }
                    className="sr-only peer"
                  />
                  <span className="bg-white transition-all duration-300 rounded-full size-4 absolute left-1 top-1/2 -translate-y-1/2 peer-checked:translate-x-6" />
                </label>

                <span
                  className={twMerge(
                    field.state.value === "yearly"
                      ? "font-bold text-gray-900"
                      : "font-normal text-gray-500",
                    "w-20 text-center",
                  )}
                >
                  Yearly
                </span>
              </div>
            )}
          </form.Field>
        </div>
      </div>
    );
  },
});
