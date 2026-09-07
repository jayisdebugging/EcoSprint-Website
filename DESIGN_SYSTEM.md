# EcoSprint Design System Documentation

**Version:** 1.0 (Phase 1 Foundation)  
**Brand Identity:** The Next-Gen Sustainability Upskilling Platform  
**Design Philosophy:** Clean • Minimal • Professional • Premium • Calm • Trustworthy • Sustainability-Focused

---

## 1. Design Philosophy & Tone

EcoSprint represents modern climate tech capability. It strictly avoids:
- Neon greens, busy animations, and excessive gradients.
- Crypto/Web3 neon tropes or generic corporate LMS appearance.
- Over-cluttered environmental NGO aesthetics.

Green is used deliberately as a **brand accent** and **success indicator**, never as a flood of color. Surfaces are clean, warm off-white, paired with rich slate charcoal typography and hairline borders.

---

## 2. Color Palette & Tokens

### Forest Green (Brand Accent & Primary Actions)
Used for high-priority CTAs, active highlights, key metrics, and brand accents.
- `forest-50`: `#f0fdf4` (Pill backgrounds, highlight surfaces)
- `forest-100`: `#dcfce7` (Selection highlight, subtle borders)
- `forest-200`: `#bbf7d0` (Badge borders)
- `forest-600`: `#16a34a` (Active focus rings, status indicators)
- `forest-700`: `#15803d` (Brand text accents, secondary buttons)
- `forest-800`: `#166534` (Primary action buttons, brand logo fill)
- `forest-900`: `#14532d` (Hover state for primary buttons)
- `forest-950`: `#052e16` (Active pressed state)

### Sage / Moss (Secondary Muted Tones)
Used for secondary indicators, verified tags, and calm informational states.
- `sage-50`: `#f4f7f4`
- `sage-100`: `#e5ede6` (Avatar placeholder background)
- `sage-200`: `#ccdbcf` (Subtle borders)
- `sage-700`: `#435847` (Dark muted text)
- `sage-800`: `#344438`

### Sand / Parchment (Warm Backgrounds)
Replaces harsh `#f3f4f6` with warm, grounded neutral surfaces.
- `sand-50`: `#fcfbf9` (Page background)
- `sand-100`: `#f7f5f0` (Card inset, filter pill background)
- `sand-200`: `#eeeae1` (Divider, subtle borders)

### Charcoal / Slate (Typography & Neutrals)
- `charcoal-500`: `#64748b` (Helper text, metadata)
- `charcoal-600`: `#475569` (Body text, descriptions)
- `charcoal-700`: `#334155` (Labels, subheadings)
- `charcoal-900`: `#0f172a` (Headings, titles, high contrast)
- `charcoal-950`: `#020617` (Deep dark elements)

---

## 3. Typography Scale

Font family: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Token | Class | Size / Line Height | Usage |
| :--- | :--- | :--- | :--- |
| **Display** | `text-4xl sm:text-5xl lg:text-6xl` | 36px–60px / 1.1 | Hero headlines |
| **Heading 1** | `text-2xl sm:text-3xl` | 24px–30px / 1.25 | Page titles, Section headers |
| **Heading 2** | `text-lg sm:text-xl` | 18px–20px / 1.35 | Card titles, Module headings |
| **Subheading** | `text-base` | 16px / 1.5 | Lead text, modal titles |
| **Body Default**| `text-sm` | 14px / 1.5 | Primary body text, table cells |
| **Body Small** | `text-xs` | 12px / 1.4 | Helper text, metadata, badges |
| **Micro** | `text-[10px]`–`text-[11px]` | 10px–11px / 1.3 | Category tags, timestamps |

---

## 4. Spacing & Layout Grid

- **Base Spacing Unit:** 4px (`0.25rem`)
- **Card Padding:**
  - `p-4` (compact cards)
  - `p-6` (standard cards, default)
  - `p-8` (feature banners, hero callouts)
- **Container Max Widths:**
  - `sm`: `max-w-3xl` (Auth forms, profile views)
  - `md`: `max-w-5xl` (Detail views, project briefs)
  - `default`: `max-w-7xl` (Standard content width, catalogs)
  - `fluid`: `max-w-full`
- **Horizontal Padding:** `px-4 sm:px-6 lg:px-8`

---

## 5. Elevation & Borders

- **Border Radius:**
  - `rounded-md`: 6px (Buttons, inputs, badges)
  - `rounded-lg`: 8px (Cards, notification toasts)
  - `rounded-xl`: 12px (Modals, hero highlight cards)
  - `rounded-full`: Pill badges, avatars
- **Borders:**
  - Default: `border border-charcoal-200/80` (hairline, calm)
  - Inset: `border-charcoal-100`
- **Shadows:**
  - `shadow-subtle`: `0 1px 2px 0 rgba(0, 0, 0, 0.04)`
  - `shadow-card`: `0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)`
  - `shadow-card-hover`: `0 4px 6px -1px rgba(0, 0, 0, 0.07)`
  - `shadow-modal`: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

---

## 6. Component Usage Principles

### Buttons (`src/components/ui/Button.jsx`)
- **Primary (`variant="primary"`):** Forest green (`bg-forest-800`). Use for main actions (e.g., "Apply for Admission", "Open Sprint Room"). Limit to 1 per view.
- **Secondary (`variant="secondary"`):** Forest tinted surface (`bg-forest-50 text-forest-900`). Great for secondary contextual actions.
- **Outline (`variant="outline"`):** Crisp white with subtle charcoal border.
- **Ghost (`variant="ghost"`):** Text-only for compact toolbars or tertiary actions.
- **Sizes:** `xs` (28px), `sm` (32px), `md` (40px, default), `lg` (44px), `xl` (48px).

### Badges (`src/components/ui/Badge.jsx`)
- Variants: `forest` (active/live), `sage` (completed/verified), `neutral` (metadata/level), `warning` (due soon), `danger` (alert).
- Optional `dot` for online/active presence.

### Cards (`src/components/ui/Card.jsx`)
- Clean white background (`bg-white`) on warm sand surface (`bg-sand-50`).
- Composable with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer`.
- Optional `hoverable` prop gives micro-elevation (-2px translation).

### Inputs & Forms (`src/components/ui/Input.jsx`, `Select.jsx`)
- Accessible `<label>` elements linked via `id`/`htmlFor`.
- Focused with `focus:ring-forest-600/30` and `focus:border-forest-600`.
- Integrated error and helper text slots.

### Modals (`src/components/ui/Modal.jsx`)
- Background blur overlay (`bg-charcoal-950/40 backdrop-blur-sm`).
- Accessible `Escape` key close listener and body scroll lock.

### Toast System (`src/components/ui/Toast.jsx`)
- Consumed via `useToast()` hook.
- Non-blocking bottom-right notifications with automatic timeout.

---

## 7. Responsive Breakpoints

- `sm`: `640px` (Phone landscape / phablet)
- `md`: `768px` (Tablet portrait)
- `lg`: `1024px` (Laptop / desktop sidebar threshold)
- `xl`: `1280px` (Full desktop view)
