---
name: neobrutalism-design
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

# Neobrutalism Design System

## Context and Goals
This skill guides the implementation of the Neobrutalism design system: a modern, high-contrast aesthetic characterized by bold borders, vivid accent colors, and raw layouts on warm surfaces. The goal is to provide structured, accessible, and implementation-first guidance that ensures system consistency and high quality.

## Design Tokens and Foundations
### Typography
- **Primary/Display**: Noto Sans JP (Weights: 100-900)
- **Monospace**: JetBrains Mono
- **Base Style**: `size: 16px`, `weight: 400`, `line-height: 24px`
- **Scale**:
    - `xs`: 14px
    - `sm`: 16px (Base)
    - `md`: 20px
    - `lg`: 24px
    - `xl`: 30px
    - `2xl`: 36px
    - `3xl`: 72px
    - `4xl`: 88px

### Color Palette
- **Border**: `default: #000000`
- **Surface**:
    - `default`: `#FBFBF9` (Warm White)
    - `muted`: `#ffffff`
    - `strong`: `#f5f5f0`
    - `raised`: `#ffdb33` (Primary Accent)
- **Text**:
    - `primary`: `#1C293C` (Dark Navy)
    - `secondary`: `#5a5a5a`
    - `inverse`: `oklab(0 0 0 / 0.8)`
- **Accents**:
    - `primary`: `#FDC800` (Yellow)
    - `secondary`: `#432DD7` (Purple)
- **Feedback**:
    - `success`: `#16A34A`
    - `warning`: `#D97706`
    - `danger`: `#DC2626`

### Spacing Scale
- `1`: 8px
- `2`: 12px
- `3`: 16px
- `4`: 24px
- `5`: 32px
- `6`: 40px
- `7`: 48px
- `8`: 64px

### Shadows and Motion
- **Shadows**: Must be hard shadows (no blur).
    - `shadow.1`: `4px 4px 0px 0px rgb(0, 0, 0)`
    - `shadow.2`: `3px 3px 0px 0px rgb(0, 0, 0)`
    - `shadow.3`: `4px 4px 0px 0px rgb(0, 0, 0)`
- **Motion**:
    - `instant`: 100ms
    - `fast`: 150ms
    - `normal`: 300ms

## Component-Level Rules
### Anatomy and Variants
- **Borders**: Must use thick, solid borders (2px or 4px) using `color.border.default`.
- **Spacing**: Must use tokens from the defined spacing scale.
- **Shadows**: Should use `shadow.1` or `shadow.2` for depth.

### States and Interaction
Every component must define and handle the following states:
- **Default**: Base appearance.
- **Hover**: Shift shadow (e.g., shadow disappears) or change background color vividly.
- **Focus-visible**: Must have a distinct, thick outline (e.g., `outline-4 outline-secondary`).
- **Active**: "Pressed" effect (shadow disappears or reverses).
- **Disabled**: Lower opacity or grayscale, but must maintain border visibility.
- **Loading**: Use specific loading indicators or skeletons.
- **Error**: High-contrast error states using `feedback.danger`.

### Behavior
- **Pointer/Touch**: Hit targets must be minimum 44x44px.
- **Keyboard**: Must be fully keyboard-operable.
- **Responsive**: Must specify behavior for different viewport sizes.
- **Edge Cases**: Must handle long-content (truncation or wrapping), overflow, and empty-states.

## Accessibility Requirements
- **Target**: WCAG 2.2 AA.
- **Keyboard-First**: All interactive elements must be keyboard-accessible.
- **Focus Indicators**: Focus states must be highly visible; hidden indicators are prohibited.
- **Contrast**: All color combinations must meet AA contrast standards.
- **Acceptance Criteria**: Accessibility rules must be testable in implementation.

## Content and Tone Standards
- **Tone**: Concise, confident, and implementation-focused.
- **Labels**: Use descriptive actions (e.g., "Save Changes" instead of "Submit").

## Anti-patterns and Prohibited Implementations
- Do not use blurred shadows or gradients.
- Do not allow low-contrast text.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Avoid inconsistent border widths (stick to 2px or 4px).

## QA Checklist
- [ ] Contrast ratios meet WCAG 2.2 AA standards.
- [ ] Focus states are highly visible and keyboard-operable.
- [ ] Borders and shadows follow the Neobrutalism style consistently (2px or 4px).
- [ ] Typography follows the defined scale and base styles.
- [ ] Spacing uses only the defined tokens.
- [ ] All component states (hover, focus, disabled, etc.) are implemented.
- [ ] Responsive behavior and edge cases are handled.
- [ ] No one-off exceptions or raw hex values are used in guidance.
