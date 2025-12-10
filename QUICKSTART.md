# Quick Start Guide

Get the Auravyx website running locally in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- A Supabase account (free)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-setup.sql`
4. Go to Settings > API and copy:
   - Project URL
   - Anon/public key

### 3. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test the Forms

1. **Waitlist Form**: Scroll to bottom, enter email, submit
2. **Partner Form**: Click "For Retail & Pro Partners" button, fill form

Check submissions in Supabase Table Editor.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main

# Then deploy
npx vercel
```

Or use the Vercel dashboard to import your GitHub repository.

## Need Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for full deployment guide
- Email: hello@auravyx.com

