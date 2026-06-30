"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { InputWrapper } from "@/components/ui/Inputs";
import type { ContactFormValues } from "@/types";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(20, "Please describe your project in at least 20 characters."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted.",
  }),
});

type ContactSchemaValues = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-50k", label: "$10k – $50k" },
  { value: "50k-150k", label: "$50k – $150k" },
  { value: "150k-plus", label: "$150k+" },
  { value: "unsure", label: "Not sure yet" },
];

const PROJECT_TYPE_OPTIONS = [
  { value: "product-engineering", label: "Product Engineering" },
  { value: "custom-software", label: "Custom Software Development" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "ui-ux", label: "UI/UX Engineering" },
  { value: "consulting", label: "Technical Consulting" },
  { value: "other", label: "Something else" },
];

// ---------------------------------------------------------------------------
// Reusable field components (no name prop conflict)
// ---------------------------------------------------------------------------

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldId: string;
  error?: string;
  helperText?: string;
}

function FieldInput({ label, fieldId, error, helperText, required, className, ...props }: FieldInputProps) {
  return (
    <InputWrapper label={label} name={fieldId} error={error} helperText={helperText} required={required}>
      <input
        id={fieldId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
        className={cn(
          "h-14 w-full px-4 rounded-[--radius-md] font-sans text-base",
          "bg-surface text-text-primary border border-border-neutral",
          "placeholder:text-text-muted transition-all duration-200",
          "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
          error && "border-danger",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    </InputWrapper>
  );
}

interface FieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  fieldId: string;
  error?: string;
}

function FieldTextarea({ label, fieldId, error, required, className, ...props }: FieldTextareaProps) {
  return (
    <InputWrapper label={label} name={fieldId} error={error} required={required}>
      <textarea
        id={fieldId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        rows={6}
        className={cn(
          "w-full px-4 py-3 rounded-[--radius-md] font-sans text-base",
          "bg-surface text-text-primary border border-border-neutral",
          "placeholder:text-text-muted resize-vertical transition-all duration-200",
          "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
          error && "border-danger",
          className,
        )}
        {...props}
      />
    </InputWrapper>
  );
}

interface FieldSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  fieldId: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}

function FieldSelect({ label, fieldId, options, placeholder, error, required, className, ...props }: FieldSelectProps) {
  return (
    <InputWrapper label={label} name={fieldId} error={error} required={required}>
      <select
        id={fieldId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          "h-14 w-full px-4 rounded-[--radius-md] font-sans text-base appearance-none",
          "bg-surface text-text-primary border border-border-neutral",
          "transition-all duration-200",
          "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
          error && "border-danger",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="text-text-muted bg-surface">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-text-primary">
            {opt.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContactFormProps {
  onSubmit?: (data: ContactFormValues) => Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false },
  });

  async function handleFormSubmit(data: ContactSchemaValues) {
    const { consent: _consent, ...values } = data;
    await onSubmit?.(values);
    setSubmitted(true);
  }

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-6 py-16"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-2xl text-text-primary">
                Message received.
              </h3>
              <p className="mt-2 text-base text-text-secondary font-sans">
                We'll review your project and get back to you within 1–2 business days.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="flex flex-col gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldInput
                label="Full name"
                fieldId="cf-name"
                placeholder="Jane Smith"
                autoComplete="name"
                required
                error={errors.name?.message}
                {...register("name")}
              />
              <FieldInput
                label="Work email"
                fieldId="cf-email"
                type="email"
                placeholder="jane@company.com"
                autoComplete="email"
                required
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Company + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldInput
                label="Company (optional)"
                fieldId="cf-company"
                placeholder="Acme Inc."
                autoComplete="organization"
                error={errors.company?.message}
                {...register("company")}
              />
              <FieldSelect
                label="Approximate budget"
                fieldId="cf-budget"
                options={BUDGET_OPTIONS}
                placeholder="Select a range"
                error={errors.budget?.message}
                {...register("budget")}
              />
            </div>

            {/* Project type */}
            <FieldSelect
              label="Project type"
              fieldId="cf-projectType"
              options={PROJECT_TYPE_OPTIONS}
              placeholder="What are you looking to build?"
              error={errors.projectType?.message}
              {...register("projectType")}
            />

            {/* Message */}
            <FieldTextarea
              label="Tell us about your project"
              fieldId="cf-message"
              placeholder="Describe the problem you're solving, your timeline, and any relevant context…"
              required
              error={errors.message?.message}
              {...register("message")}
            />

            {/* Consent */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cf-consent" className="flex items-start gap-3 cursor-pointer group">
                <input
                  id="cf-consent"
                  type="checkbox"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "cf-consent-error" : undefined}
                  className="mt-0.5 w-5 h-5 shrink-0 rounded-[--radius-sm] bg-surface border border-border-neutral accent-accent-blue cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                  {...register("consent")}
                />
                <span className="text-sm font-sans text-text-secondary group-hover:text-text-primary transition-colors">
                  I agree to be contacted by Alpha Company regarding my inquiry.{" "}
                  <a href="/privacy" className="text-accent-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                  <span className="ml-1 text-danger" aria-hidden="true">*</span>
                </span>
              </label>
              {errors.consent && (
                <p id="cf-consent-error" className="text-sm text-danger font-sans pl-8" role="alert">
                  {errors.consent.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                showArrow
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
