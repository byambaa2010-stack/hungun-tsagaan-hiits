# Design Handoff — hungun-tsagaan-hiits

## Approval Record
- Approved homepage option: **Option B** (horizontal hero + technical spec panel)
- Approval source: user confirmed after design edits in `output/hungun-tsagaan-hiits/designs/homepage-directions.pen`
- Exported preview: `output/hungun-tsagaan-hiits/designs/homepage-option-b.png`
- Date: 2026-06-24

## Visual Direction
- **Direction name:** Data Precision
- **Concept:** Dark engineering surface, monospace data accents, technical-spec panels, grid lines
- **Mood:** Formal, technical, trustworthy, Mongolian-market professional

## Motion
- **Level:** 2 (Alive)
- **Core library:** framer-motion
- **Scroll library:** lenis
- **Intersection observer:** react-intersection-observer
- **Behavior:** fade-up reveals on scroll, subtle hover lifts on cards/buttons, staggered list entrances, reduced-motion fallback

## Color Tokens
- background: `#0A0A0F`
- surface: `#1A1A22`
- surfaceElevated: `#23232E`
- accent: `#2563EB`
- accentHover: `#1D4ED8`
- text: `#FAFAFA`
- textMuted: `#A1A1AA`
- textSubtle: `#71717A`
- border: `#27272A`
- success: `#22C55E`
- warning: `#EAB308`
- error: `#EF4444`

## Typography
- **Sans:** Inter, system-ui, sans-serif
- **Mono:** JetBrains Mono, ui-monospace, monospace
- Heading weight: 600
- Body weight: 400

## Layout Grid
- Container max-width: 80rem (1280px)
- Container padding: 1.5rem
- Section vertical padding: 6rem mobile / 8rem desktop
- Radius: small 0.25rem / medium 0.5rem / large 0.75rem

## Sections (homepage order)
1. **Header** — sticky, blur backdrop, logo left, nav center, CTA right
2. **Hero** — two-column: headline + CTAs left; technical spec panel right
3. **About** — two-column: structure visual left; text + stats row right
4. **Services** — section header + 4-card grid (numbered 01-04)
5. **Gallery** — homepage preview: one large image + two stacked images
6. **Testimonials** — 3-column quote cards
7. **Blog** — horizontal list rows (title left, date right)
8. **Upload** — two-column: text left; file-upload contact form right
9. **Footer** — brand + link columns + copyright/standards bar

## Additional Pages
- `/gallery` — full gallery page with filters (Бүгд, Оффис, Худалдаа, Орон сууц, Лобби) and 3x3 image grid
- `/contact` — contact form left, contact text/details right, office map section below
- `/about` — CMS-driven standalone page
- `/services` — CMS-driven standalone page
- `/blog` — blog listing
- `/blog/[slug]` — blog detail

## Navigation Labels (mn)
- Нүүр → /
- Бидний тухай → /about
- Үйлчилгээ → /services
- Галерей → /gallery
- Мэдээ → /blog
- Холбоо барих → /contact
- Header CTA: Үнийн санал → /contact

## Content Language
- Primary: Mongolian (mn)
- Tone: formal, technical

## Assets
- Logo text: **GER GROUP**
- Hero spec panel code: `0613001.1`
- Hero specs: Конфигурац `6LE(B70)#2 + 12A + 6C`, K утга `1.80 W/(㎡·K)`, SC/SHGC `0.59 / 0.51`, Гэрэл `66%`
- About structure list: `6063-T5/T6`, `PA66 GF25 тусгаарлагч`, `EPDM уян хатан`, `Силикон герметик`
- Stats: 12+ жил, 80+ төсөл, 35+ харилцагч, 2013
- Footer standards: `JGJ151 · GB/T 5237 · GB 50009`

## Component Inventory
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/sections/HeroSection.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/ServicesSection.tsx`
- `components/sections/GallerySection.tsx`
- `components/sections/TestimonialsSection.tsx`
- `components/sections/BlogSection.tsx`
- `components/sections/UploadSection.tsx`
- `components/sections/ContactSection.tsx`
- `components/sections/ContactForm.tsx`
- `components/motion/FadeIn.tsx`
- `components/motion/StaggerContainer.tsx`

## Animation Specs
- All section entrances: `fadeUp` with `easeOutExpo [0.22, 1, 0.36, 1]`, duration 0.5s
- Stagger: 0.08s between children
- Hero load: immediate opacity/y reveal, no scroll trigger
- Card hover: `translateY(-4px)` + border accent glow
- Button hover: background darken or border accent transition
- Reduced motion: disable all transforms, instant opacity

## Notes
- No user auth; business site
- No e-commerce
- Use `@/components/common/Image` for all images
- Use `@/i18n/routing` Link for navigation
- CMS queries must pass `language: "mn"`
