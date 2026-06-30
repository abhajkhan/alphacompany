# Alpha Company Design System v1.0

> "Design systems are software."
>
> Every component should be reusable.
> Every token should have a purpose.
> Every animation should reinforce usability.

---

# 1. Design Principles

The Alpha Company Design System is built upon five principles.

## Precision

Every pixel has purpose.

Nothing exists only for decoration.

---

## Consistency

Components never reinvent themselves.

Buttons always behave like buttons.

Cards always behave like cards.

---

## Hierarchy

Visual hierarchy should communicate importance before users read the text.

---

## Performance

Motion enhances understanding.

Never slows the experience.

---

## Scalability

The system should support

* Marketing website
* Product websites
* SaaS dashboards
* Documentation
* Admin panels
* Mobile applications

using the same design language.

---

# 2. Foundations

## Grid

Desktop

12 Columns

Maximum Width

1440px

Container

1280px

Gutter

24px

---

Tablet

8 Columns

Container

100%

Padding

32px

---

Mobile

4 Columns

Padding

20px

---

# 3. Spacing Tokens

Base Unit

4px

Spacing Scale

| Token | Value |
| ----- | ----: |
| xs    |   4px |
| sm    |   8px |
| md    |  16px |
| lg    |  24px |
| xl    |  32px |
| 2xl   |  48px |
| 3xl   |  64px |
| 4xl   |  96px |
| 5xl   | 128px |
| 6xl   | 160px |

Rule

Never use arbitrary spacing.

Only spacing tokens.

---

# 4. Border Radius

| Token |  Value |
| ----- | -----: |
| none  |    0px |
| sm    |    6px |
| md    |   12px |
| lg    |   18px |
| xl    |   24px |
| full  | 9999px |

---

# 5. Color Tokens

## Neutral

Background

#050505

Background Secondary

#101010

Surface

#171717

Surface Hover

#202020

Border

#2A2A2A

Divider

#343434

---

## Text

Primary

#FFFFFF

Secondary

#C7C7C7

Muted

#8D8D8D

Disabled

#666666

---

## Accent

Primary Blue

#3B82F6

Blue Hover

#60A5FA

Blue Active

#2563EB

---

## Semantic

Success

#16A34A

Warning

#F59E0B

Danger

#DC2626

Info

#0EA5E9

---

# 6. Typography

Primary Font

Space Grotesk

Secondary

Inter

Monospace

JetBrains Mono

---

## Heading Scale

Display XL

96px

Display L

72px

Display M

56px

H1

48px

H2

40px

H3

32px

H4

24px

H5

20px

Body Large

18px

Body

16px

Small

14px

Caption

12px

---

Weights

400

500

600

700

---

Line Height

Headings

110%

Paragraphs

160%

---

# 7. Elevation

Level 0

Flat

---

Level 1

Subtle border only

---

Level 2

Small shadow

---

Level 3

Floating panel

---

Level 4

Modal

---

Never use dramatic shadows.

---

# 8. Icons

Library

Lucide

Style

Outline

Stroke Width

1.75

Size

16

20

24

32

No filled icons.

---

# 9. Buttons

## Primary

Purpose

Main CTA

Background

Blue

Text

White

Padding

16 × 28

Radius

12px

Hover

Background brightens

TranslateY(-2)

Duration

200ms

---

## Secondary

Outline

Transparent

Border

Neutral

Hover

Border Blue

---

## Ghost

No border

Hover

Surface background

---

States

Default

Hover

Focus

Active

Disabled

Loading

---

# 10. Navigation

Height

80px

Desktop

Transparent

Blur

16px

Sticky

Yes

Scroll

Background appears

Logo shrinks slightly

---

Mobile

Fullscreen drawer

Slide from right

300ms

---

# 11. Cards

Variants

Service Card

Product Card

Article Card

Team Card

Case Study Card

Statistic Card

Technology Card

---

Card Rules

Background

Surface

Radius

20px

Padding

32px

Border

1px

Hover

TranslateY(-6)

Scale(1.02)

Border becomes blue

---

# 12. Forms

Input Height

56px

Radius

12px

Border

Neutral

Focus

Blue border

Blue glow

Error

Red border

Helper Text

14px

Labels always visible.

Never placeholders only.

---

# 13. Section Templates

Hero

Large headline

Supporting text

2 CTAs

Visual

---

Content

Heading

Paragraph

Image

---

Feature Grid

3 or 6 cards

---

Timeline

Vertical desktop

Horizontal mobile

---

CTA

Centered

Large headline

Single button

---

# 14. Motion System

Motion should communicate confidence.

Never entertainment.

---

Durations

Fast

150ms

Normal

250ms

Medium

400ms

Large

700ms

Hero

1000ms

---

Easing

easeOutQuart

easeInOutQuart

easeOutExpo

---

Never

Bounce

Elastic

Overshoot

Rubber-band

---

# 15. Scroll Behavior

Smooth scrolling

120fps capable

No scroll hijacking

---

Section Reveal

Fade

TranslateY

40px

Duration

700ms

---

Stagger

80ms

---

Parallax

Maximum

15%

---

# 16. Hero Animation

Background grid

Slow movement

---

Light beam

Very subtle

---

Particle density

Low

---

3D object

Slow rotation

No interaction overload

---

# 17. Hover Effects

Buttons

Lift

Arrow moves

---

Cards

Lift

Border glow

---

Images

Scale

1.04

---

Links

Underline animation

---

Icons

Rotate

8°

Maximum

---

# 18. Loading States

Skeleton loading

Preferred

---

Spinner

Only for

Short tasks

---

Page Transition

Fade

250ms

---

# 19. Responsive Rules

Desktop

Full experience

---

Tablet

Reduce spacing

Simplify animations

---

Mobile

Remove decorative motion

Prioritize speed

No hover interactions

---

# 20. Component Library

Navigation

Footer

Buttons

Badge

Chip

Input

Textarea

Select

Checkbox

Radio

Switch

Accordion

Tabs

Modal

Drawer

Tooltip

Toast

Avatar

Pagination

Breadcrumb

Hero

Section Header

Statistic

Timeline

Feature Grid

Technology Grid

Service Card

Product Card

Blog Card

Case Study Card

Testimonial Card

Pricing Card

FAQ

Newsletter

Contact Form

CTA Banner

404 Section

Empty State

Loading State

---

# 21. Accessibility

WCAG AA minimum

Visible keyboard focus

ARIA labels

Semantic HTML

Minimum contrast ratio

4.5:1

Touch targets

Minimum

44px

Animations respect

prefers-reduced-motion

---

# 22. Performance Budget

Lighthouse

95+

Accessibility

100

SEO

100

Best Practices

100

CLS

<0.1

LCP

<2.5s

INP

<200ms

Initial JS

<200KB

---

# 23. Tech Stack

Framework

Next.js

Language

TypeScript

Styling

Tailwind CSS

Animation

Framer Motion

GSAP

3D

React Three Fiber

Icons

Lucide

CMS

Sanity or Payload CMS

Deployment

Vercel

Analytics

PostHog

---

# 24. Component Naming

Buttons

ButtonPrimary

ButtonSecondary

ButtonGhost

Cards

ServiceCard

ProductCard

InsightCard

CaseStudyCard

Hero

HeroDefault

HeroProduct

HeroArticle

Forms

TextInput

TextArea

SelectInput

CheckboxField

---

# 25. AI Implementation Rules

An AI agent implementing this system must:

* Never invent new colors outside the token system.
* Never invent spacing values.
* Never create one-off button styles.
* Never introduce new typography scales.
* Reuse existing components whenever possible.
* Prefer composition over duplication.
* Keep animations subtle and purposeful.
* Maintain consistent behavior across all pages.

---

# 26. Definition of Done

A page is considered complete only if it:

* Uses only approved design tokens.
* Uses reusable components.
* Meets accessibility standards.
* Passes performance budgets.
* Matches the established motion language.
* Is fully responsive.
* Has no inconsistent spacing, colors, or typography.
* Feels unmistakably like Alpha Company.

# 27. Navigation Behavior Specification

## Default State (Top of Page)

**Trigger**

* Scroll position: **0-64px**

**Appearance**

* Background: `transparent`
* Backdrop blur: `0px`
* Border: `none`
* Shadow: `none`
* Logo: Full size (100%)
* Navigation links: White (`#FFFFFF`)
* CTA button: Primary style from the Design System

The navigation should visually blend into the hero section.

---

## Scrolled State

**Trigger**

Transition begins when the user scrolls **64px** from the top of the document.

At **80px**, the transition should be fully complete.

This creates a smooth interpolation rather than an abrupt change.

---

## Scrolled Appearance

Background

```css
rgba(5, 5, 5, 0.82)
```

Backdrop Blur

```text
16px
```

Border Bottom

```css
1px solid rgba(255,255,255,0.06)
```

Shadow

Very subtle

```css
0 8px 24px rgba(0,0,0,0.18)
```

Logo

Scale

```text
100% → 94%
```

Navigation Links

Remain white

Hover uses the accent blue defined in the Design System.

---

## Animation

Duration

```text
300ms
```

Easing

```text
easeOutQuart
```

Animate only:

* background-color
* backdrop-filter
* border-color
* box-shadow
* transform (logo scale)

Do **not** animate:

* width
* height
* top
* left

Those properties trigger layout recalculations and can make scrolling feel less smooth.

---

## Mobile Behavior

The same transition rules apply.

When the mobile menu opens:

* Background becomes fully opaque (`#050505`)
* Blur increases to **20px**
* Page scrolling is locked
* Overlay fades in over **250ms**

---

## Accessibility

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

* Skip interpolation.
* Switch directly between transparent and solid states.
* Keep the timing at **0ms** or near-instant.

---

## Implementation Notes

Recommended implementation:

* Listen to `window.scrollY`.
* Treat `64px` as the threshold.
* Interpolate values until `80px`.
* Throttle updates with `requestAnimationFrame` or use a motion library to avoid unnecessary re-renders.

---

# Design System Philosophy

The Alpha Company Design System is intended to outlive any single redesign.

Layouts may evolve.

Content will evolve.

Products will evolve.

The system itself should remain stable.

Every new page, product, and application should feel like it belongs to the same engineering organization without requiring users to consciously notice it.

