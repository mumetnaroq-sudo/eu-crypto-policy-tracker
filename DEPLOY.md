# EU Crypto Policy Tracker - Deployment Guide

## Quick Start

The static build is ready in the `dist/` folder (83 KB first load JS).

## Deployment Options

### Option 1: GitHub Pages (Free, Recommended)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Select **GitHub Actions** as the source
4. The workflow in `.github/workflows/deploy.yml` will automatically deploy

**URL format:** `https://yourusername.github.io/eu-crypto-tracker`

### Option 2: Vercel

```bash
# With Vercel CLI
npx vercel login
npx vercel --cwd ./dist

# Or with environment variable
export VERCEL_TOKEN="your_token"
npx vercel --cwd ./dist --token $VERCEL_TOKEN
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=dist --prod
```

### Option 4: Cloudflare Pages

```bash
# Install Wrangler
npm install -g wrangler

# Deploy
wrangler pages deploy dist --project-name=eu-crypto-tracker
```

### Option 5: Manual Upload

Upload the contents of the `dist/` folder to any static hosting provider:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage
- Any web server (Apache, Nginx)

## Build Output

```
dist/
├── index.html      # Main entry point (10 KB)
├── 404.html        # Error page (2.5 KB)
└── _next/          # Assets (JS, CSS, images)
    └── static/
        ├── css/    # Stylesheets
        └── chunks/ # JavaScript bundles
```

## Verification

After deployment, verify:
1. Site loads without 404 errors
2. Terminal styling renders correctly
3. All 6 regulations display
4. Responsive layout works on mobile

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Build output is in dist/
```
