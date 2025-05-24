interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export default function Label({
  htmlFor,
  children,
  className,
  required,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-primary ${className}`}
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
