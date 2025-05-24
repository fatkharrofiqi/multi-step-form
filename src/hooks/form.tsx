import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context.tsx";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});
