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
