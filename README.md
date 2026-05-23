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
The 3D cube and its interactions are located in `src/components/Scene.jsx`. You can change the geometry, material, or animation logic there.

