# 3D Developer Portfolio

A modern, professional 3D developer portfolio built with React, React Three Fiber, and Framer Motion. This portfolio is designed with a premium "black and grey" futuristic aesthetic, perfect for showcasing backend and engineering expertise.

## 🚀 Tech Stack

- **React** - UI Library
- **React Three Fiber** - 3D Bridge for Three.js
- **Drei** - Useful helpers for Three.js
- **Three.js** - 3D Engine
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Plain CSS** - Modern dark theme with glassmorphism

## 🛠️ Getting Started

### 1. Installation

First, clone the repository or download the files. Then, install the dependencies:

```bash
npm install
```

### 2. Run Locally

To start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## 🚀 Vercel Deployment

This project is prepared for Vercel as a static Vite app.

### Build settings

- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Environment variables

If you want BharathiGPT to use Gemini or OpenAI on Vercel, add these environment variables in the Vercel project settings:

- `VITE_BHARATHI_GPT_PROVIDER` = `gemini` or `openai`
- `VITE_GEMINI_API_KEY`
- `VITE_GEMINI_MODEL`
- `VITE_OPENAI_API_KEY`
- `VITE_OPENAI_MODEL`

If no provider key is set, the assistant falls back to grounded portfolio responses.

### Automatic deploys

Link the GitHub repository to Vercel and enable deployments from the main branch. After that, every successful push will trigger a new deployment automatically.

### Notes

- The app is a Vite single-page portfolio, so Vercel should serve `dist/index.html` for client-side navigation.
- No extra deployment logic was added to the application.

## 🎨 Customization

### Changing Theme Colors
All core colors are defined in `src/index.css` under `:root`. You can modify the `--accent-light` and `--accent-grey` variables to change the highlight colors across the site.

### Updating Personal Information
- **Name/Title/Hero**: Modify `src/sections/Hero.jsx`
- **About Me**: Modify `src/sections/About.jsx`
- **Skills**: Modify the `skills` array in `src/sections/Skills.jsx`
- **Projects**: Modify the `projects` array in `src/sections/Projects.jsx`
- **Journey**: Modify the `timeline` array in `src/sections/Experience.jsx`
- **Social Links**: Modify `src/sections/Contact.jsx` and `src/sections/Hero.jsx`

### Modifying 3D Scene
The current portfolio does not use a separate 3D scene component in the app shell.

