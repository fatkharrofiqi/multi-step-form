import { withForm } from "@/hooks/form";
import Input from "../../input";
import Label from "../../label";
import { formSubscription } from "../../shared-form";

export const PersonalInfoStep = withForm({
  ...formSubscription,
  render: ({ form }) => {
    return (
      <div className="bg-white m-4 rounded-md p-6 max-h-max space-y-5">
        <p className="font-bold text-2xl text-primary">Personal info</p>
        <p className="text-gray-500 leading-5">
          Please provide your name, email, and phone number.
        </p>
        <div className="space-y-5">
          <form.Field name="personalInfo.name">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. Stephen King"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors
                    .map((value) => value?.message)
                    .join(", ")}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="personalInfo.email">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. stephenking@lorem.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors
                    .map((value) => value?.message)
                    .join(", ")}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="personalInfo.phone">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Phone Number</Label>
                <Input
                  type="tel"
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. +1 234 567 890"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors
                    .map((value) => value?.message)
                    .join(", ")}
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>
    );
  },
});
