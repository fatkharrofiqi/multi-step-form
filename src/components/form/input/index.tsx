import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface LabelProps {
  id?: string | undefined;
  name?: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  value?: string | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
  checked?: boolean | undefined;
  errors?: string | undefined;
}

export default function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  checked,
  className,
  errors,
}: LabelProps) {
  const isError = errors && errors.length > 0;

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`placeholder:text-tiny tracking-wide py-3.5 px-tiny rounded-md border-2 ${className} ${
          isError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {isError && <span className="text-red-500 text-sm mt-1">{errors}</span>}
    </>
  );
}
