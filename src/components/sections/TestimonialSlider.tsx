"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/Cards";
import type { TestimonialItem } from "@/types";

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // -1 for left, 1 for right

  function handleNext() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }

  function handlePrev() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <TestimonialCard testimonial={testimonials[index]} className="border-border-neutral" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-end gap-3 px-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="p-3 bg-surface border border-border-neutral rounded-full text-text-secondary hover:text-text-primary hover:border-accent-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="p-3 bg-surface border border-border-neutral rounded-full text-text-secondary hover:text-text-primary hover:border-accent-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
