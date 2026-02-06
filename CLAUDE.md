# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio site built with React 19 and Vite. Currently a minimal starter template.

## Commands

```bash
npm run dev       # Start dev server (localhost:5173) with HMR
npm run build     # Production build to dist/
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

To auto-fix lint issues: `npm run lint -- --fix`

## Architecture

- **Framework**: React 19.2 with Vite 7.2
- **Language**: JavaScript/JSX (no TypeScript, though type definitions are available)
- **Styling**: Plain CSS

### Key Files

- `src/main.jsx` - React app entry point, mounts to `#root`
- `src/App.jsx` - Main application component
- `src/index.css` - Global styles
- `vite.config.js` - Vite configuration with React plugin
- `eslint.config.js` - ESLint v9 flat config with React hooks and refresh rules

## Production Setup (Vercel)

### Required Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description | How to Get |
|----------|-------------|------------|
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token for video uploads | Vercel Dashboard → Storage → Create Blob Store → Connect to project |
| `ADMIN_SECRET` | Secret for admin authentication | Generate with `openssl rand -hex 32` |

### Vercel Blob Setup

1. Go to Vercel Dashboard → Storage → Create Database → Blob
2. Name the store (e.g., "portfolio-blob")
3. Connect it to this project
4. The `BLOB_READ_WRITE_TOKEN` will be automatically added to your environment

### API Endpoints

- `POST /api/testimonials` - Public: Submit a new testimonial
- `GET /api/testimonials?approved=true` - Public: Fetch approved testimonials
- `GET /api/testimonials` - Admin: Fetch all testimonials (requires `x-admin-secret` header)
- `PATCH /api/testimonials/[id]` - Admin: Approve/update testimonial
- `DELETE /api/testimonials/[id]` - Admin: Delete testimonial
- `POST /api/blob/video` - Vercel Blob client upload handler for videos
