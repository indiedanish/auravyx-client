# Auravyx Website - Deployment Guide

This guide walks you through deploying the Auravyx pre-launch website to production.

## Quick Deployment Checklist

- [ ] Supabase project created and database configured
- [ ] Environment variables ready
- [ ] GitHub repository created
- [ ] Vercel account ready
- [ ] Domain configured (optional)

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Enter project details:
   - **Name:** Auravyx Website
   - **Database Password:** Generate a strong password and save it
   - **Region:** Choose closest to your target audience (e.g., London)
4. Wait for the project to initialize (~2 minutes)

### 1.2 Set Up Database Tables

1. In your Supabase dashboard, click on "SQL Editor"
2. Click "New Query"
3. Copy the entire contents of `supabase-setup.sql` from this repository
4. Paste into the SQL Editor
5. Click "Run" or press Cmd/Ctrl + Enter
6. You should see "Auravyx database setup complete!" in the results

### 1.3 Get Your API Credentials

1. Go to Settings > API in your Supabase dashboard
2. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (long string starting with `eyJ...`)
3. Save these securely - you'll need them for deployment

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```bash
cd /path/to/aurayx
git init
git add .
git commit -m "Initial commit: Auravyx pre-launch website"
```

### 2.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon > "New repository"
3. Name it: `auravyx-website` (or your preferred name)
4. Keep it **Private** (recommended for now)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2.3 Push Your Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/auravyx-website.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click "Add New..." > "Project"
3. Import your GitHub repository (grant Vercel access if prompted)
4. Select the `auravyx-website` repository

### 3.2 Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### 3.3 Add Environment Variables

Before clicking "Deploy", add your environment variables:

1. Click "Environment Variables" section
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key | Production, Preview, Development |

3. Click "Deploy"

### 3.4 Wait for Deployment

- First deployment takes 2-3 minutes
- Vercel will show real-time build logs
- Once complete, you'll get a live URL like `https://auravyx-website.vercel.app`

## Step 4: Test Your Deployment

### 4.1 Test the Live Site

1. Visit your Vercel deployment URL
2. Check that all sections load correctly
3. Test the waitlist form:
   - Enter an email
   - Click "Join Waitlist"
   - Verify you see a success message
4. Test the partner enquiry form:
   - Click "For Retail & Pro Partners"
   - Fill out the form
   - Submit and verify success message

### 4.2 Verify Data in Supabase

1. Go back to your Supabase dashboard
2. Click "Table Editor"
3. Select `waitlist_submissions` - you should see your test entry
4. Select `partner_enquiries` - you should see your test entry

### 4.3 Performance Check

1. Run a Lighthouse audit (Chrome DevTools > Lighthouse)
2. Aim for:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 95+

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain in Vercel

1. In your Vercel project, go to Settings > Domains
2. Enter your domain (e.g., `auravyx.com`)
3. Follow Vercel's instructions to configure DNS

### 5.2 DNS Configuration

If using Vercel DNS:
- Add A record: `76.76.21.21`
- Add CNAME for www: `cname.vercel-dns.com`

### 5.3 SSL Certificate

- Vercel automatically provisions SSL certificates
- Usually takes 5-10 minutes after DNS propagation
- Your site will be available at `https://yourdomain.com`

## Step 6: Set Up Analytics (Optional)

### 6.1 Vercel Analytics

1. In Vercel dashboard, go to your project
2. Click "Analytics" tab
3. Click "Enable Analytics"
4. Free tier includes basic metrics

### 6.2 Alternative: Plausible Analytics

For privacy-focused analytics:

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Add the script to `app/layout.tsx`:

```tsx
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

## Step 7: Ongoing Maintenance

### Viewing Submissions

**Option 1: Supabase Dashboard**
- Log into Supabase
- Go to Table Editor
- Browse your tables

**Option 2: Export Data**
```sql
-- Run in Supabase SQL Editor
COPY (
  SELECT * FROM waitlist_submissions 
  ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;
```

### Updating the Site

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
4. Vercel automatically deploys changes to production

### Monitoring

- Check Vercel dashboard for deployment status
- Monitor Supabase for database performance
- Review form submissions regularly
- Set up email notifications in Supabase (Functions) if needed

## Troubleshooting

### Forms Not Submitting

1. Check browser console for errors
2. Verify environment variables in Vercel
3. Check Supabase RLS policies are correct
4. Test Supabase connection with SQL query

### Build Failures

1. Check Vercel build logs for errors
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check Node.js version (should be 18+)

### Performance Issues

1. Run Lighthouse audit to identify issues
2. Check image optimization (if images added later)
3. Review Vercel Analytics for slow endpoints
4. Consider enabling Vercel Edge Functions for API routes

## Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] Supabase RLS policies are enabled
- [ ] HTTPS is enforced (automatic with Vercel)
- [ ] Security headers configured (in `vercel.json`)
- [ ] No sensitive IP or internal logic exposed
- [ ] Forms have basic validation
- [ ] Rate limiting considered for production (Vercel automatic)

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Auravyx Support:** hello@auravyx.com

---

**Congratulations!** 🎉 Your Auravyx pre-launch website is now live!

