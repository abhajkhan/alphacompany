# Alpha Company Design Language v1.0

This document should be treated as the **single source of truth** for every page, component, animation, and future product. Any AI agent, designer, or developer working on the project should follow this design language before writing a single line of UI code.

---

# 1. Brand Philosophy

## Core Belief

Technology should feel engineered, not manufactured.

Alpha Company exists to build products that solve difficult problems through thoughtful engineering, disciplined execution, and uncompromising quality.

The brand should project **quiet confidence**, not loud superiority.

---

## Brand Personality

Primary Traits

* Intelligent
* Confident
* Precise
* Modern
* Technical
* Strategic
* Reliable
* Minimal

Secondary Traits

* Bold
* Curious
* Innovative
* Human-centered
* Calm
* Premium

Avoid appearing

* Aggressive
* Arrogant
* Corporate bureaucracy
* Sales-heavy
* Trend-chasing
* Playful
* Gimmicky

---

# 2. Brand Positioning

We don't sell websites.

We engineer digital products.

We don't compete on price.

We compete on execution.

We don't promise magic.

We deliver software that lasts.

---

# 3. Emotional Goal

Every visitor should subconsciously feel:

> "These people know exactly what they're doing."

The website should inspire

* Trust
* Curiosity
* Respect
* Confidence

Never

* Urgency
* Fear
* Hype

---

# 4. Design Formula

The website should blend three design philosophies:

## Swab The World (45%)

Purpose

Interaction Design

Borrow

* Storytelling through scrolling
* Cinematic pacing
* Large transitions
* Section reveals
* Immersive navigation
* Scroll-triggered animations
* Bold typography

---

## FlyHyer (35%)

Purpose

Luxury Experience

Borrow

* Premium spacing
* Sophisticated layouts
* Elegant motion
* Refined cards
* Beautiful photography
* High-end composition

---

## IDEO (20%)

Purpose

Intellectual Authority

Borrow

* Editorial layouts
* White space
* Clear information hierarchy
* Thought leadership
* Long-form readability
* Human-centered storytelling

---

# 5. Design Keywords

Every design decision should satisfy at least one of these words.

```
Precision

Depth

Engineering

Architecture

Structure

Flow

Focus

Confidence

Clarity

Craftsmanship

Performance

Innovation

Elegance
```

---

# 6. Visual Style

Imagine

Apple meets Linear.

Tesla meets IDEO.

A high-end architecture studio meets a software company.

The website should resemble an operating system more than a marketing brochure.

---

# 7. Color Language

## Primary Background

```
#050505
```

---

## Secondary Background

```
#101010
```

---

## Surface

```
#171717
```

---

## Borders

```
#262626
```

---

## Primary Text

```
#FFFFFF
```

---

## Secondary Text

```
#B7B7B7
```

---

## Accent

Electric Blue

```
#3B82F6
```

Accent should be used sparingly:

* Links
* Active navigation
* Small indicators
* CTA highlights
* Cursor interactions

Never entire sections.

---

# 8. Typography

Primary Font

Space Grotesk

Secondary Font

Inter

Fallback

System UI

---

## Heading Style

Large

Bold

Minimal words

Examples

```
Build Better.

Software
Without
Compromise.

Ideas
Into
Products.
```

---

## Paragraph Style

Short paragraphs

Maximum

3–4 lines

Readable

Conversational

Technical

---

## Text Hierarchy

Hero

72–120 px

Section Heading

48–64 px

Subheading

24–32 px

Body

18–20 px

Caption

14 px

---

# 9. Layout System

12-column responsive grid.

Generous margins.

Lots of breathing room.

Whitespace should communicate confidence.

If something feels crowded, remove elements before shrinking them.

---

# 10. Spacing Language

Small

8 px

Medium

16 px

Large

32 px

Section

80–120 px

Hero

140–180 px

Everything should feel spacious.

---

# 11. Component Philosophy

Every component should have

One purpose.

One interaction.

One visual hierarchy.

Avoid decorative elements.

---

# 12. Buttons

Primary

Black background

White text

Blue hover glow

Rounded 12 px

Hover

Background brightens slightly

Arrow slides

Tiny elevation

---

Secondary

Outline

Minimal

Text only

---

# 13. Cards

Flat.

Not glass.

Soft shadows.

Subtle borders.

Large padding.

Hover

Scale

1.02

Small upward movement

Background brightens

---

# 14. Motion Language

Motion communicates confidence.

Never excitement.

---

Animations should feel

Heavy

Deliberate

Smooth

Controlled

---

Avoid

Bounce

Elastic effects

Cartoon easing

Exaggerated motion

---

Preferred easing

```
easeOutExpo

easeInOutCubic

easeInOutQuart
```

---

# 15. Scroll Experience

Scrolling should reveal the story.

Not dump information.

Each section introduces

One idea.

Then moves on.

---

# 16. Cursor

Desktop only.

Small custom cursor.

Expands over

Buttons

Projects

Cards

Shows

```
Open

View

Explore
```

---

# 17. Navigation

Transparent.

Minimal.

Logo

Left.

Navigation

Right.

Becomes solid after scrolling.

Fullscreen overlay menu.

---

# 18. Photography

Use

Developers

Whiteboards

Hardware

Server rooms

Engineering teams

Architecture

Abstract geometry

Monitors

Code

Dark offices

---

Avoid

Stock business handshakes

Happy office meetings

People pointing at laptops

Generic smiling teams

Overused startup imagery

---

# 19. Illustration Style

Minimal.

Abstract.

Wireframes.

3D geometry.

Architectural forms.

No cartoons.

---

# 20. Icons

Simple.

Thin stroke.

Consistent size.

Prefer outline icons.

---

# 21. 3D Elements

Only where meaningful.

Ideas

Abstract Alpha symbol

Floating architectural shapes

Network visualization

Data flow

Particles

Digital terrain

Avoid

Spaceships

Robots

Neon cubes

Cyberpunk cities

---

# 22. Content Tone

Write like experienced engineers.

Not marketers.

Examples

Good

```
We build software
that scales with your business.
```

Better

```
Engineered for growth.
Built to last.
```

Bad

```
We are passionate about delivering innovative cutting-edge digital transformation experiences.
```

---

# 23. Homepage Flow

1. Hero

↓

2. Who We Are

↓

3. Services

↓

4. Products

↓

5. Engineering Process

↓

6. Technologies

↓

7. Case Studies

↓

8. Insights

↓

9. Testimonials

↓

10. Contact

Each section should feel like the next chapter of a story, not another slide in a sales deck.

---

# 24. Technical Principles

* Mobile-first responsive design
* 60 FPS animations
* Accessibility-first
* WCAG AA compliance
* Semantic HTML
* Optimized images
* Lazy loading
* Server-side rendering where appropriate
* Performance budget < 2 MB initial load
* Respect `prefers-reduced-motion`

---

# 25. Non-Negotiable Rules

Never use:

* Glassmorphism
* Neumorphism
* AI-generated people
* Crypto aesthetics
* Purple/pink gradients
* Excessive blur
* Floating decorative blobs
* Emoji icons
* Long marketing paragraphs
* Generic SaaS hero sections
* Auto-playing background videos with no purpose
* Animations that block user interaction
* More than one primary CTA per section

---

# 26. The Alpha Principle

Every design decision should pass this test:

> **Does this communicate engineering excellence through clarity, precision, and restraint?**

If the answer is no, remove it.

A website for a software engineering company should feel like a well-designed system: elegant because it is purposeful, not because it is overloaded with effects. The strongest impression comes from disciplined execution. Ironically, that's much harder than adding another animation, which is why so many sites end up looking like someone's GPU benchmark instead of a company's identity.

