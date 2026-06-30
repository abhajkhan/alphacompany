"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface NewsletterProps {
  heading?: string;
  subheading?: string;
  /** Called with email on successful submission */
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

export function Newsletter({
  heading = "Engineering Insights.",
  subheading = "We share what we learn while building products. No noise, no marketing — only engineering.",
  onSubmit,
  className,
}: NewsletterProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onFormSubmit(data: NewsletterFormValues) {
    await onSubmit?.(data.email);
    setSubmitted(true);
  }

  return (
    <div
      className={cn(
        "bg-surface border border-border-neutral rounded-[--radius-xl] p-8 sm:p-10",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center gap-4 py-6"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
            <div>
              <p className="font-sans font-semibold text-lg text-text-primary">You're in.</p>
              <p className="text-sm text-text-secondary font-sans mt-1">
                Expect thoughtful engineering content in your inbox.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-6">
              <h3 className="font-sans font-semibold text-xl text-text-primary">{heading}</h3>
              <p className="mt-2 text-sm text-text-secondary font-sans leading-relaxed">
                {subheading}
              </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className={cn(
                      "h-12 w-full px-4 rounded-[--radius-md] font-sans text-sm",
                      "bg-background-primary text-text-primary",
                      "border border-border-neutral placeholder:text-text-muted",
                      "transition-all duration-200",
                      "focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
                      errors.email && "border-danger",
                    )}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="newsletter-email-error" className="mt-1.5 text-xs text-danger font-sans" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  showArrow
                  className="shrink-0"
                >
                  Subscribe
                </Button>
              </div>
              <p className="mt-3 text-xs text-text-muted font-sans">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
