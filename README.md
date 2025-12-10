# Auravyx Pre-Launch Website

A premium, inclusive wellness intelligence landing page built with Next.js 14, Tailwind CSS, and Supabase.

## Features

- 🎨 Modern, premium wellness-tech design
- 📱 Fully responsive (mobile-first)
- ⚡ Fast performance with Next.js App Router
- 🗄️ Supabase backend for form submissions
- 🔒 Privacy-focused and GDPR-ready
- ♿ Accessible with WCAG compliance
- 📊 SEO optimized with metadata and sitemap

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Hosting:** Vercel
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (free tier works)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd aurayx
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL commands from `supabase-setup.sql` to create the required tables
4. Get your project URL and anon key from Settings > API

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aurayx/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for form handling
│   │   ├── waitlist/
│   │   └── partner/
│   ├── privacy/           # Privacy notice page
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx
│   ├── ProofStrip.tsx
│   ├── WhatAuravyxDoes.tsx
│   ├── WhyThisMatters.tsx
│   ├── Benefits.tsx
│   ├── HowItWorks.tsx
│   ├── RetailersSection.tsx
│   ├── WaitlistSection.tsx
│   ├── PartnerModal.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   └── Section.tsx
├── lib/                   # Utility functions
│   └── supabase.ts        # Supabase client
├── public/                # Static assets
└── supabase-setup.sql     # Database setup SQL
```

## Database Tables

### waitlist_submissions

Stores email signups from the main waitlist form.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | User email (unique) |
| interest_area | text | Optional interest (skin/hair/nutrition/all) |
| created_at | timestamp | Submission timestamp |

### partner_enquiries

Stores partnership and retail enquiries.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Contact name |
| company | text | Company/organization |
| email | text | Contact email |
| role | text | Contact role/title |
| message | text | Enquiry message |
| created_at | timestamp | Submission timestamp |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Vercel will automatically:
- Build your Next.js app
- Set up a production domain
- Enable Analytics
- Configure edge functions for API routes

### Environment Variables in Production

Make sure to add these in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Viewing Form Submissions

### Option 1: Supabase Dashboard

1. Go to your Supabase project
2. Click on "Table Editor"
3. Select `waitlist_submissions` or `partner_enquiries`
4. View and export data as needed

### Option 2: SQL Queries

In the Supabase SQL Editor, you can run queries like:

```sql
-- View recent waitlist signups
SELECT * FROM waitlist_submissions 
ORDER BY created_at DESC 
LIMIT 50;

-- View partner enquiries
SELECT * FROM partner_enquiries 
ORDER BY created_at DESC 
LIMIT 50;

-- Count waitlist signups by interest
SELECT interest_area, COUNT(*) 
FROM waitlist_submissions 
GROUP BY interest_area;
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme. The current palette uses:
- Deep blacks and grays for backgrounds
- Gold accent colors (customizable in the `gold` color scale)

### Copy/Content

All text content is directly in the component files for easy editing:
- Hero text: `components/Hero.tsx`
- Section content: Individual component files
- Footer: `components/Footer.tsx`
- Privacy: `app/privacy/page.tsx`

### Adding Blog/News

To add a blog in the future:

1. Create `app/blog/page.tsx` for the blog index
2. Create `app/blog/[slug]/page.tsx` for individual posts
3. Add a CMS like Contentful or use MDX for content
4. Update the footer and navigation to include blog links

## Performance

The site is optimized for:
- Core Web Vitals (LCP, FID, CLS)
- Fast page loads with minimal JavaScript
- Image optimization (when images are added)
- Font optimization with Next.js font loading

## Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Color contrast meets WCAG AA standards

## Security

- Environment variables for sensitive data
- Server-side API routes for database access
- Input validation on all forms
- HTTPS enforced in production
- CORS configured properly

## Support

For questions or issues:
- Email: hello@auravyx.com
- Review this README
- Check Supabase and Vercel documentation

## License

© 2025 Auravyx Technologies Ltd. All rights reserved.

---

**Note:** This is a pre-launch public site. No internal algorithms, scoring systems, or proprietary IP are exposed in this codebase. All references to "Auravyx intelligence" remain generic and high-level.

