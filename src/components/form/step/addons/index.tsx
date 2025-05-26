import { withForm } from "@/hooks/form";
import type { Addon } from "@/model/type";
import Input from "../../input";
import Label from "../../label";
import { formSubscription } from "../../shared-form";

export const AddonsStep = withForm({
  ...formSubscription,
  props: {
    addons: [] as Addon[],
  },
  render: ({ form, addons }) => (
    <div className="bg-white m-4 rounded-md p-6 max-h-max md:min-w-[24rem] lg:min-w-medium space-y-5 md:m-0 md:p-0">
      <p className="font-bold text-2xl text-primary">Pick add-ons</p>
      <p className="text-gray-500 leading-5">
        Add-ons help enhance your gaming experience.
      </p>
      <div className="space-y-4">
        <form.Field name="addons">
          {(field) => (
            <div className="space-y-4">
              {addons.map((addon) => (
                <Label
                  key={addon.id}
                  className={`flex items-center gap-4 p-4 border-2 rounded-md cursor-pointer ${
                    field.state.value.includes(addon.id)
                      ? "border-primary bg-white"
                      : "border-gray-300"
                  }`}
                >
                  <Input
                    type="checkbox"
                    checked={field.state.value.includes(addon.id)}
                    onChange={() => {
                      const newAddons = field.state.value.includes(addon.id)
                        ? field.state.value.filter((id) => id !== addon.id)
                        : [...field.state.value, addon.id];
                      field.handleChange(newAddons);
                    }}
                    className="size-5"
                  />
                  <div>
                    <p className="font-bold text-primary">{addon.name}</p>
                    <p className="text-gray-500 text-tiny">
                      {addon.description}
                    </p>
                  </div>
                  <p className="ml-auto text-secondary">
                    +$
                    {form.state.values.plan.billing === "monthly"
                      ? addon.monthly
                      : addon.yearly}
                    /
                    {form.state.values.plan.billing === "monthly" ? "mo" : "yr"}
                  </p>
                </Label>
              ))}
            </div>
          )}
        </form.Field>
      </div>
    </div>
  ),
});
