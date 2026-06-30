# Alpha Company Development Guide v1.0

> **Purpose**
>
> Define the technical architecture, engineering standards, coding conventions, performance budgets, security practices, and deployment workflow for the Alpha Company website.

---

# 1. Engineering Philosophy

The website is a software product, not a marketing asset.

Every implementation decision should optimize for:

* Performance
* Maintainability
* Accessibility
* Scalability
* SEO
* Developer Experience

The codebase should be easy to understand six months later by a new engineer.

---

# 2. Technology Stack

## Framework

Next.js (App Router)

Reason

* Server Components
* Streaming
* SEO
* Excellent developer experience

---

## Language

TypeScript

Strict Mode enabled.

No JavaScript files.

---

## Runtime

Node.js LTS

---

## Styling

Tailwind CSS

Rules

* Utility-first styling
* No inline styles
* No arbitrary values unless absolutely necessary
* Prefer design tokens

---

## Animation

Framer Motion

Purpose

* Component animations
* Hover states
* Page transitions

---

GSAP

Purpose

* Scroll-driven storytelling
* Hero animations
* Timelines

---

## 3D

React Three Fiber

Use only when meaningful.

Acceptable uses

* Hero visualization
* Abstract engineering objects
* Interactive product showcase

Avoid decorative 3D.

---

## Icons

Lucide Icons

---

## Fonts

Space Grotesk

Inter

Loaded through Next.js Font Optimization.

---

## CMS (Future)

Payload CMS

or

Sanity

The frontend should be CMS-ready from day one.

---

## Analytics

PostHog

Google Analytics 4

Consent-aware implementation.

---

# 3. Project Structure

```text
src/

├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── animations/
│   └── icons/
│
├── features/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── styles/
│
├── types/
│
├── utils/
│
├── constants/
│
├── config/
│
└── assets/
```

Every directory should have a single responsibility.

---

# 4. Naming Conventions

Components

PascalCase

```text
Hero.tsx

Navbar.tsx

ProductCard.tsx
```

---

Hooks

```text
useScrollReveal()

useWindowSize()
```

---

Utilities

camelCase

```text
formatDate()

slugify()
```

---

Constants

UPPER_SNAKE_CASE

```text
SITE_NAME

NAVIGATION_ITEMS
```

---

CSS Classes

Tailwind utilities only.

No custom utility classes unless reusable.

---

# 5. Component Architecture

Each component must:

* Be reusable
* Be composable
* Accept typed props
* Avoid duplicated logic
* Be independent

Example

```text
Button

Variants

Primary

Secondary

Ghost

Danger
```

Never create one-off components.

---

# 6. State Management

Prefer

React State

↓

Context

↓

Server Components

↓

URL State

Only introduce a global state library when necessary.

---

# 7. Data Fetching

Default

Server Components

Client Components only for:

* Forms
* Interactive widgets
* Animations
* Browser APIs

Use async Server Components whenever possible.

---

# 8. API Layer

All external requests should pass through dedicated service modules.

Never fetch directly inside UI components.

Example

```text
services/

products.ts

articles.ts

contact.ts
```

---

# 9. Forms

Validation

Zod

React Hook Form

Requirements

* Client-side validation
* Server-side validation
* Accessible labels
* Clear error messages
* Loading state
* Success state

---

# 10. Environment Variables

Separate

Development

Staging

Production

Never expose secrets to the client.

Use

```text
NEXT_PUBLIC_

only for public values.
```

---

# 11. Accessibility Standards

Target

WCAG AA

Requirements

* Semantic HTML
* Keyboard navigation
* Focus states
* Screen reader support
* ARIA only when necessary
* Minimum touch target 44px

Animations must respect

```text
prefers-reduced-motion
```

---

# 12. SEO Standards

Every page must include

* Title
* Meta Description
* Canonical URL
* Open Graph
* Twitter Card
* Structured Data
* XML Sitemap
* robots.txt

Use Next.js Metadata API.

---

# 13. Image Standards

Use

next/image

Formats

AVIF

WebP

Lazy-load all non-critical images.

Provide descriptive alt text.

Avoid images larger than required.

---

# 14. Performance Budget

Lighthouse

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

---

Largest Contentful Paint

Less than 2.5s

---

Interaction to Next Paint

Less than 200ms

---

Cumulative Layout Shift

Less than 0.1

---

Initial JavaScript

Target

Below 200KB

---

# 15. Code Quality

Linting

ESLint

Formatting

Prettier

Type Checking

TypeScript

Run all checks before merge.

---

# 16. Git Workflow

Branches

```text
main

develop

feature/*

fix/*

hotfix/*
```

Never develop directly on main.

---

Commit Format

```text
feat:

fix:

refactor:

docs:

style:

perf:

test:

build:

chore:
```

Example

```text
feat: add animated hero section

fix: improve mobile navigation

perf: optimize image loading
```

---

# 17. Pull Request Checklist

Every PR must:

* Build successfully
* Pass linting
* Pass type checks
* Meet accessibility requirements
* Maintain responsive behavior
* Avoid console errors
* Include meaningful description

---

# 18. Security

Always

* Sanitize user input
* Validate server-side
* Escape rendered HTML
* Protect secrets
* Use HTTPS
* Enable security headers

Never

* Trust client input
* Expose API keys
* Commit secrets

---

# 19. Error Handling

Show meaningful messages.

Avoid exposing internal details.

Log unexpected errors.

Provide graceful fallbacks.

---

# 20. Logging

Development

Verbose

Production

Errors and critical events only.

Avoid unnecessary console output.

---

# 21. Motion Performance

Use CSS transforms instead of layout changes.

Animate

* opacity
* transform
* filter (sparingly)

Avoid animating

* width
* height
* top
* left

Keep animations at 60 FPS.

---

# 22. Responsive Development

Breakpoints

```text
Mobile

0–767px

Tablet

768–1023px

Desktop

1024–1439px

Large Desktop

1440px+
```

Design mobile-first.

---

# 23. Browser Support

Latest two versions of

* Chrome
* Firefox
* Safari
* Edge

Graceful degradation for older browsers.

---

# 24. Testing Strategy

Unit Tests

* Utilities
* Business logic

Component Tests

* UI interactions
* States

End-to-End Tests

* Navigation
* Forms
* Contact flow

Visual Regression

* Core pages
* Shared components

---

# 25. CI/CD Pipeline

Pipeline Stages

```text
Install

↓

Type Check

↓

Lint

↓

Unit Tests

↓

Build

↓

Performance Audit

↓

Preview Deployment

↓

Production Deployment
```

Fail the pipeline on:

* Type errors
* Lint errors
* Build failures
* Performance budget violations

---

# 26. Deployment

Hosting

Vercel

Preview deployments for every pull request.

Production deploys from the `main` branch only.

---

# 27. Monitoring

Use

* Vercel Analytics
* PostHog
* Sentry

Monitor

* Errors
* Performance
* Core Web Vitals
* User journeys

---

# 28. Documentation

Every reusable component must include:

* Purpose
* Props
* Usage example
* Accessibility notes
* Variants
* Limitations

Keep documentation updated alongside implementation.

---

# 29. AI Coding Agent Rules

An AI coding agent must:

* Follow the Design System exactly.
* Never invent new colors, spacing, or typography.
* Reuse existing components before creating new ones.
* Prefer Server Components unless interactivity requires a Client Component.
* Avoid premature optimization but respect performance budgets.
* Write readable, strongly typed TypeScript.
* Keep files focused and reasonably sized.
* Remove unused code before completion.
* Add comments only where intent is not obvious.
* Never bypass linting or type errors.

---

# 30. Definition of Done

A feature is complete only when:

* It matches the approved UI Blueprint.
* It follows the Design System.
* It is responsive across supported breakpoints.
* It passes linting and type checks.
* It meets accessibility requirements.
* It satisfies performance budgets.
* It includes tests where appropriate.
* It is documented if reusable.
* It introduces no critical security concerns.
* It is production-ready without temporary workarounds.

---

# Engineering Principle

Every commit should leave the codebase cleaner than it was found.

The website should be maintainable by a small engineering team, scalable as Alpha Company grows, and structured so that both humans and AI agents can contribute confidently without sacrificing quality or consistency.

