---
name: CloudStock Pro
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 260px
---

## Brand & Style
The design system is engineered for a high-performance inventory management environment where clarity, precision, and reliability are paramount. It draws inspiration from modern enterprise leaders, merging the systematic utility of developer tools with the approachable elegance of high-end productivity software. 

The visual style is **Corporate Modern with Minimalist influences**, emphasizing a "content-first" hierarchy. It utilizes generous whitespace to reduce cognitive load during complex data entry and stock analysis. The aesthetic is defined by crisp lines, subtle depth through layering, and a restrained but purposeful use of color to guide user intent and indicate system status.

## Colors
This design system utilizes a structured palette designed for professional clarity. 

- **Primary Blue (#2563eb):** Used for primary actions, active states, and key focus indicators. 
- **Secondary Slate (#1e293b):** Reserved for high-level navigation elements like the sidebar and headers to provide a strong visual anchor.
- **Success & Warning:** Green (#10b981) and Amber (#f59e0b) are used strictly for status indicators and semantic feedback.
- **Neutrals:** A scale of cool grays is used for typography and UI borders to maintain a clean, "uncluttered" interface.
- **Backgrounds:** The primary application background is a soft light gray (#f8fafc), allowing white cards and containers to pop with clear definition.

## Typography
The design system employs **Geist** for its technical precision and exceptional legibility in data-dense environments. 

- **Headlines:** Use tighter letter spacing and semi-bold weights to create a strong visual hierarchy.
- **Body Text:** Optimized for long-form reading and data scanning; `body-md` (14px) is the standard for most interface text to maximize information density without sacrificing clarity.
- **Labels:** Used for table headers and metadata. Use `label-sm` with all-caps for secondary categorizations.
- **Scaling:** On mobile devices, large headlines automatically scale down to preserve the layout balance.

## Layout & Spacing
The design system uses a **Fluid Grid** with fixed-width constraints for content containers. 

- **Layout Model:** A classic L-shell layout featuring a fixed-width left sidebar (`260px`) and a fluid main content area.
- **Grid:** Use a 12-column grid for desktop views. Components within cards should follow an 8px spacing rhythm.
- **Responsive Behavior:** 
    - **Desktop (>1024px):** Sidebar is expanded; 32px external margins.
    - **Tablet (768px - 1023px):** Sidebar collapses to icons only; 24px margins.
    - **Mobile (<767px):** Sidebar becomes an overlay drawer; 16px margins; single-column card stack.

## Elevation & Depth
Hierarchy is established using **Tonal Layers** supplemented by **Ambient Shadows**. This approach creates a sense of "physicality" where the background feels like a floor and cards sit slightly above it.

- **Level 0 (Background):** #f8fafc. No shadow.
- **Level 1 (Cards/Surface):** White (#ffffff). 1px border (#e2e8f0). Soft, diffused shadow (0 1px 3px 0 rgba(0, 0, 0, 0.05)).
- **Level 2 (Dropdowns/Modals):** White (#ffffff). 1px border (#e2e8f0). Elevated shadow (0 10px 15px -3px rgba(0, 0, 0, 0.08)).
- **Interactive Elements:** Buttons utilize a tiny 1px bottom-border offset to simulate a tactile "click" surface.

## Shapes
The design system adopts a **Rounded** aesthetic to balance its professional nature with a modern, approachable feel. 

- **Standard Elements:** Buttons, inputs, and small widgets use a **0.5rem (8px)** radius.
- **Containers:** Dashboard cards and large sections use `rounded-lg` (**1rem / 16px**) to create distinct visual blocks.
- **Interactive States:** Focus rings should follow the border radius of the element with a 2px offset.

## Components
Consistent component styling ensures the interface feels unified and reliable.

- **Buttons:** 
  - *Primary:* Solid #2563eb background, white text, subtle top-inner-shadow.
  - *Secondary:* White background, #e2e8f0 border, #1e293b text.
- **Input Fields:** 14px text, 8px padding, #e2e8f0 border. On focus, use a 2px primary blue ring with 20% opacity.
- **Cards:** White background, 16px border radius, 24px internal padding. Always include a 1px border for definition against the light gray background.
- **Chips/Badges:** Use `label-sm` typography. Status-specific backgrounds should have 10% opacity of the semantic color (e.g., Success green) with high-contrast text.
- **Lists/Tables:** Horizontal-only borders in tables (#f1f5f9). Row hover state uses #f8fafc.
- **Sidebar Nav:** High contrast links (#94a3b8) that transition to White text on a primary-blue background for the active state.