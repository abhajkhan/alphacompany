"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Shared input field wrapper
// ---------------------------------------------------------------------------

interface InputWrapperProps {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function InputWrapper({
  label,
  name,
  error,
  helperText,
  required,
  className,
  children,
}: InputWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-text-secondary font-sans"
      >
        {label}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-danger font-sans" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${name}-helper`} className="text-sm text-text-muted font-sans">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TextInput
// ---------------------------------------------------------------------------

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, error, helperText, required, wrapperClassName, className, ...props }, ref) => {
    const describedBy = error
      ? `${name}-error`
      : helperText
        ? `${name}-helper`
        : undefined;

    return (
      <InputWrapper
        label={label}
        name={name}
        error={error}
        helperText={helperText}
        required={required}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "h-14 w-full px-4 rounded-[--radius-md] font-sans text-base",
            "bg-surface text-text-primary",
            "border border-border-neutral",
            "placeholder:text-text-muted",
            "transition-all duration-200",
            "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
            error && "border-danger focus:border-danger focus:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
      </InputWrapper>
    );
  },
);

TextInput.displayName = "TextInput";

// ---------------------------------------------------------------------------
// TextArea
// ---------------------------------------------------------------------------

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name, error, helperText, required, wrapperClassName, className, ...props }, ref) => {
    const describedBy = error
      ? `${name}-error`
      : helperText
        ? `${name}-helper`
        : undefined;

    return (
      <InputWrapper
        label={label}
        name={name}
        error={error}
        helperText={helperText}
        required={required}
        className={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          rows={props.rows ?? 5}
          className={cn(
            "w-full px-4 py-3 rounded-[--radius-md] font-sans text-base",
            "bg-surface text-text-primary",
            "border border-border-neutral",
            "placeholder:text-text-muted",
            "resize-vertical transition-all duration-200",
            "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
            error && "border-danger focus:border-danger focus:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
      </InputWrapper>
    );
  },
);

TextArea.displayName = "TextArea";

// ---------------------------------------------------------------------------
// SelectInput
// ---------------------------------------------------------------------------

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      name,
      options,
      placeholder = "Select an option",
      error,
      helperText,
      required,
      wrapperClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const describedBy = error
      ? `${name}-error`
      : helperText
        ? `${name}-helper`
        : undefined;

    return (
      <InputWrapper
        label={label}
        name={name}
        error={error}
        helperText={helperText}
        required={required}
        className={wrapperClassName}
      >
        <select
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "h-14 w-full px-4 rounded-[--radius-md] font-sans text-base appearance-none",
            "bg-surface text-text-primary",
            "border border-border-neutral",
            "transition-all duration-200",
            "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
            error && "border-danger",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        >
          <option value="" disabled className="text-text-muted bg-surface">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-text-primary">
              {opt.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  },
);

SelectInput.displayName = "SelectInput";

// ---------------------------------------------------------------------------
// CheckboxField
// ---------------------------------------------------------------------------

export interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
  name: string;
  error?: string;
  wrapperClassName?: string;
}

const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, name, error, required, wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", wrapperClassName)}>
        <label htmlFor={name} className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={name}
            name={name}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={cn(
              "mt-0.5 w-5 h-5 shrink-0 rounded-[--radius-sm]",
              "bg-surface border border-border-neutral",
              "accent-accent-blue",
              "cursor-pointer transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
              error && "border-danger",
              className,
            )}
            {...props}
          />
          <span className="text-sm font-sans text-text-secondary group-hover:text-text-primary transition-colors">
            {label}
            {required && (
              <span className="ml-1 text-danger" aria-hidden="true">
                *
              </span>
            )}
          </span>
        </label>
        {error && (
          <p id={`${name}-error`} className="text-sm text-danger font-sans pl-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

CheckboxField.displayName = "CheckboxField";

export { TextInput, TextArea, SelectInput, CheckboxField };
