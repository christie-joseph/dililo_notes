# Design System: Letters for Divins

## Theme Tokens

- **Color Mode**: LIGHT
- **Primary Font (Headlines/Display)**: Noto Serif
- **Body Font (Body/Labels)**: Plus Jakarta Sans
- **Corner Roundness**: Round Eight (1.5rem/24px)
- **Custom Accent Color**: #8FA382

## Core Color Palette

| Token | Hex |
| :--- | :--- |
| `primary` | #4b6d43 |
| `on_primary` | #ffffff |
| `primary_container` | #c7edb9 |
| `on_primary_container` | #395a32 |
| `secondary` | #3d6985 |
| `on_secondary` | #ffffff |
| `secondary_container` | #c7e7ff |
| `on_secondary_container` | #285671 |
| `tertiary` | #845c32 |
| `on_tertiary` | #ffffff |
| `tertiary_container` | #d9a777 |
| `on_tertiary_container` | #482904 |
| `error` | #ae4025 |
| `on_error` | #ffffff |
| `error_container` | #fd795a |
| `on_error_container` | #6e1400 |

## Surface & Background Colors

| Token | Hex |
| :--- | :--- |
| `background` | #fffbff |
| `on_background` | #39382f |
| `surface` | #fffbff |
| `on_surface` | #39382f |
| `surface_variant` | #ece8db |
| `on_surface_variant` | #66655a |
| `outline` | #838175 |
| `outline_variant` | #bcb9ad |
| `surface_container_highest` | #ece8db |
| `surface_container_high` | #f2eee2 |
| `surface_container` | #f7f3e8 |
| `surface_container_low` | #fdf9ef |
| `surface_container_lowest` | #ffffff |

---

# Design System Specification: The Curated Ephemera

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Keepsake."** 

We are moving away from the sterile, rigid grids of traditional social productivity apps and moving toward the tactile, intentional feel of a high-end editorial journal. This system treats digital notes not as data points, but as artifacts. We achieve this through a "compositional" layout strategy—utilizing intentional asymmetry, overlapping elements, and significant white space to create a sense of breathing room and human touch. The interface should feel like a collection of fine stationery laid out on a clean wooden desk: organized, yet organic.

This initial build will be **mobile-focused**, prioritizing one-handed usability, large touch targets, seamless bottom-oriented navigation, and mobile-native gestures (swipes, pulls) over desktop paradigms.

---

## 2. Colors
Our palette is rooted in nature and tactile materials—parchment, moss, and sky.

### The "No-Line" Rule
To maintain the premium, scrapbook-like feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a main content area using `surface-container-low` (#fdf9ef) should sit atop a `surface` (#fffbff) background. This creates a soft, architectural transition rather than a digital "cut."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define depth:
- **Base Layer:** `surface` (#fffbff)
- **Secondary Layout Areas:** `surface-container-low` (#fdf9ef)
- **Interactive Cards:** `surface-container` (#f7f3e8) or `surface-container-highest` (#ece8db)
- **Floating Modals/Elements:** `surface-container-lowest` (#ffffff)

### The "Glass & Gradient" Rule
For elements that require a "signature" feel (like floating action buttons or highlighted note categories), use Glassmorphism. Apply a 60% opacity to `surface_container_lowest` combined with a `backdrop-blur` of 12px-20px. 

### Signature Textures
Main CTAs and Hero sections should avoid flat fills. Use a subtle linear gradient (135°) transitioning from `primary` (#4b6d43) to `primary_container` (#c7edb9) to provide a "soulful" depth that mimics the way light hits a matte-printed surface.

---

## 3. Typography
The typography system is a dialogue between the classic (Serif) and the contemporary (Sans-Serif).

*   **Display & Headlines (Noto Serif):** Used for "moments of reflection"—headers, note titles, and large editorial callouts. The serif adds a layer of authority and warmth.
*   **Body & Labels (Plus Jakarta Sans):** Used for "moments of action"—note content, metadata, and navigation. It is highly legible and keeps the system feeling modern.

**Editorial Hierarchy (Mobile Scaled):**
- **Display-LG (2.5rem - 3rem):** Use for empty state welcomes or major section headers. (Scaled down for mobile viewports to prevent awkward wrapping).
- **Title-MD (1.125rem):** The workhorse for note summaries; use `on_surface_variant` (#66655a) to soften the contrast.
- **Body-MD (1rem):** Used for comfortable long-form reading on mobile devices.
- **Label-SM (0.6875rem):** Use `on_tertiary_fixed_variant` (#53320b) for timestamps to create a subtle "stamped" ink effect.

---

## 4. Elevation & Depth
Depth in this system is a result of **Tonal Layering**, not structural shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a natural "lift" that mimics paper on paper.
*   **Ambient Shadows:** When a floating effect is necessary (e.g., a dragged note), use an ultra-diffused shadow: `box-shadow: 0 12px 32px rgba(57, 56, 47, 0.06);`. The shadow color is a tinted version of `on_surface` (#39382f) rather than black, ensuring it feels like natural ambient light.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use the `outline_variant` (#bcb9ad) at **15% opacity**. This provides a "suggestion" of a boundary without breaking the soft aesthetic.
*   **Roundedness:** Adhere to the `xl` (1.5rem) scale for cards and `full` for buttons. This high radius reinforces the "friendly and tactile" brand pillar.

---

## 5. Components

### Cards & Carousels
- **Note Cards:** Forbid divider lines. Use `surface_container` and separate metadata from content using `1.5rem` of vertical padding.
- **Carousels:** Use "Peek-a-boo" layouts where the next card is partially visible (offset by 24px). This encourages exploration without needing heavy arrows.

### Buttons & Touch Targets
- **Minimum Touch Area:** Ensure all interactive elements (buttons, chips, icons) are at least 48x48px to accommodate mobile touch interactions.
- **Primary:** Gradient fill (`primary` to `primary_container`) with `on_primary` text. `xl` roundedness. Full-width buttons on mobile should stick to the bottom of the viewport area with safe-area padding.
- **Secondary:** `secondary_container` (#c7e7ff) background with `on_secondary_container` (#285671) text. No border.
- **Tertiary:** Text only using `primary` (#4b6d43) with a subtle `surface_variant` underline on hover.

### Navigation & Modals
- **Bottom Navigation:** Avoid top-heavy navigation bars. Place primary actions and navigation at the bottom of the screen to accommodate one-handed device use.
- **Bottom Sheets over Modals:** Instead of center-screen popups, use bottom-anchored sliding sheets that feel natural to swipe down and dismiss on mobile.

### Simple Forms
- **Input Fields:** Use a "Well" style. Background `surface_container_high` (#f2eee2) with no border. On focus, transition the background to `surface_container_lowest` (#ffffff) and apply a Ghost Border.
- **Checkboxes:** Use `primary` for the checked state. The "check" icon should be `on_primary` (#ffffff) to ensure high contrast.

### Chips
- **Filter Chips:** Use `secondary_fixed_dim` (#aedafa) for unselected states. When active, use `secondary` (#3d6985) with a soft shadow to simulate a "pressed" physical sticker.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., 24px left, 32px right) for long-form note views to mimic a handwritten journal.
- **Do** layer `tertiary_container` (#d9a777) behind `primary` elements for a sophisticated, "layered paper" color pop.
- **Do** prioritize white space over information density. Every note deserves its own "frame."

### Don'ts
- **Don't** use 100% black (#000000) for text. Always use `on_surface` (#39382f) to keep the "warmth."
- **Don't** use standard Material Design "elevated" shadows. They are too aggressive for this aesthetic.
- **Don't** use sharp 90-degree corners. Even "none" on our scale should be avoided in favor of at least `sm` (0.25rem).
- **Don't** use horizontal rules (`<hr>`). Use a `2rem` spacing gap or a slight background tonal shift instead.

---

## 7. Mobile-First Implementation Guidelines

- **Viewport & Scrolling:** Ensure the `<body>` prevents overscroll where unnecessary and supports native momentum scrolling (`-webkit-overflow-scrolling: touch`).
- **Safe Areas:** Utilize `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` to ensure content doesn't collide with the mobile device's notch, dynamic island, or gesture bar.
- **Gestures:** Implement swipe actions (like swipe-to-delete) on list items and edge-swipes for returning to the previous screen rather than relying solely on top-left back buttons.
