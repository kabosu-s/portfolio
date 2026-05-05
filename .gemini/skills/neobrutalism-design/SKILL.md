---
name: neobrutalism-design
description: Design system expert for Neobrutalism aesthetics. Use when designing UI components, choosing colors, or defining layouts to ensure consistent high-contrast borders, vivid accent colors, and accessible visual hierarchy.
---

# Neobrutalism Design System

## Overview
This skill guides the implementation of the Neobrutalism design system: a modern, high-contrast aesthetic characterized by bold borders, vivid accent colors, and raw layouts on warm surfaces.

## Style Foundations
- **Visual Style**: Bold, high-contrast, modern brutalism.
- **Color Palette**:
    - **Primary**: `#FDC800` (Yellow) - Use for main actions and highlights.
    - **Secondary**: `#432DD7` (Purple) - Use for secondary actions and links.
    - **Surface**: `#FBFBF9` (Warm White) - Primary background color.
    - **Text**: `#1C293C` (Dark Navy) - Primary text and border color.
    - **Success**: `#16A34A`
    - **Warning**: `#D97706`
    - **Danger**: `#DC2626`
- **Typography**: 
    - Primary/Display: **Inter** (Weights: 100-900)
    - Monospace: **JetBrains Mono**
    - Scale: 13, 15, 17, 21, 27, 35 (px)
- **Spacing Scale**: 4, 8, 12, 16, 24, 32 (px)
- **Borders**: Thick, solid borders (usually 2px-4px) using the `text` color (#1C293C).

## Component Rules
### General Anatomy
Components should typically have:
- Bold borders (2px-4px).
- Flat or hard-shadowed backgrounds (no blur).
- High-contrast interaction states.

### States & Interaction
- **Hover**: Shift shadow or change background color vividly.
- **Focus-visible**: Distinct, thick outline (e.g., `outline-4 outline-secondary`).
- **Active**: "Pressed" effect (shadow disappears or reverses).
- **Disabled**: Lower opacity, grayscale, but maintain border visibility.
- **Hit Targets**: Minimum 44x44px for touch accessibility.

## Rules: Do
- Use semantic tokens (e.g., `@theme inline` variables) over raw hex values.
- Maintain a consistent spacing rhythm.
- Ensure WCAG 2.2 AA compliance for all color combinations.
- Use hard shadows: `shadow-[4px_4px_0px_0px_rgba(28,41,60,1)]`.

## Rules: Don't
- Avoid low-contrast text.
- Avoid inconsistent border widths (keep to 2px or 4px).
- Avoid blurred shadows or gradients (unless specifically requested).

## QA Checklist
- [ ] Contrast ratios meet AA standards.
- [ ] Focus states are highly visible.
- [ ] Borders and shadows follow the Neobrutalism style consistently.
- [ ] Typography follows the defined scale and fonts.
