import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({ label, id, className = "", ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        className={`min-h-11 rounded-xl border border-border bg-white px-3.5 py-2.5 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft ${className}`}
        {...props}
      />
    </div>
  );
}
