# JuniorPath 🚀

> A virtual remote internship platform for junior web developers. Build real, portfolio-ready projects and become job-ready.

![JuniorPath](https://img.shields.io/badge/JuniorPath-Build%20Real%20Projects-A855F7)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)

## Deploy to Netlify

1. Push this repo to GitHub
2. In Netlify: **Add new site → Import an existing project**
3. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. SPA redirects are configured (`/* → /index.html`) so client routes work

Or use the Netlify CLI:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```


## ✨ Features

- **🗺️ Horizontal Roadmap** — Visual tree view of 10 projects per stack (Beginner → Advanced)
- **🎯 30 Projects** — 10 each for Frontend, Backend, and Fullstack paths
- **💻 In-Browser Coding** — StackBlitz integration for beginner projects
- **🃏 150 Flashcards** — 50 per stack with 3D flip animation
- **🏆 Points System** — Gamified with signup bonus (+50), project completion (+100), flashcards (+10)
- **🔐 Authentication** — Signup/login powered by Supabase Auth + PostgreSQL (protected routes)
- **🐍 Snake Game** — Take a break with smooth jazz vibes
- **📱 Fully Responsive** — Mobile-first design
- **🌙 Premium Dark UI** — Modern, developer-focused aesthetic
- **⚡ Performance Optimized** — Code splitting, lazy loading, and efficient bundling

## 🎨 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| State | Zustand (with persistence) |
| Routing | React Router v6 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Confetti | canvas-confetti |
| Audio | Web Audio API (Snake game) |

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Background | `#0A0A0A` | Main background |
| Card Background | `#161616` | Cards, panels |
| Accent Green | `#22C55E` | Success, completed |
| Accent Red | `#EF4444` | Errors, locked |
| Accent Purple | `#A855F7` | Primary actions, highlights |
| Text Primary | `#FFFFFF` | Headings |
| Text Secondary | `#D1D5DB` | Body text |
| Text Muted | `#9CA3AF` | Captions |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/juniorpath.git
cd juniorpath

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (optimized with code splitting)
npm run build

# Type check without emitting files
npm run typecheck
```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run TypeScript type checking only |

## 📁 Project Structure

```
src/
├── App.tsx              # Main app with routing and code splitting
├── main.tsx             # Entry point
├── index.css            # Global styles + Tailwind
├── store/
│   └── useStore.ts      # Zustand store (auth, progress, points)
├── data/
│   ├── projects.ts      # 30 project definitions
│   └── flashcards.ts    # 150 flashcards
├── components/
│   ├── Navbar.tsx       # Navigation with points display
│   ├── AppDock.tsx      # Bottom dock navigation
│   └── ui/              # Reusable UI components
│       ├── aurora-hero.tsx
│       ├── glass-dock.tsx
│       ├── perspective-grid.tsx
│       ├── radial-glow-button.tsx
│       ├── spotlight-navbar.tsx
│       ├── why-us-bento.tsx
│       └── animated-footer.tsx
└── pages/
    ├── Landing.tsx       # Hero + features + stacks
    ├── Auth.tsx          # Login & Signup
    ├── StackSelection.tsx # Choose Frontend/Backend/Fullstack
    ├── Roadmap.tsx       # Horizontal project tree
    ├── ProjectDetail.tsx # Project page + code editor
    ├── Flashcards.tsx    # 3D flip flashcards
    ├── Dashboard.tsx     # Progress overview
    ├── SuggestProject.tsx # Community suggestions
    └── SnakeGame.tsx     # Relaxation game + jazz music
```

## 🎮 Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing Page | No |
| `/login` | Login | No |
| `/signup` | Sign Up | No |
| `/stack-selection` | Choose Stack | Yes |
| `/dashboard` | User Dashboard | Yes |
| `/roadmap` | Horizontal Roadmap | Yes |
| `/project/:id` | Project Detail | Yes |
| `/flashcards` | Flashcards | Yes |
| `/suggest` | Suggest Project | Yes |
| `/snake` | Snake Game | Yes |

## 🏗️ Project Lists

### Frontend (Next.js + TypeScript)
1. Personal Portfolio (Beginner) 🎮 In-browser
2. Product Landing Page (Beginner) 🎮 In-browser
3. Weather App (Beginner) 🎮 In-browser
4. Admin Dashboard (Intermediate)
5. E-commerce Product Listing + Cart (Intermediate)
6. Job Board (Intermediate)
7. Multi-step Form (Intermediate)
8. Kanban Board (Advanced)
9. Analytics Dashboard (Advanced)
10. Full E-commerce Frontend (Advanced)

### Backend (Node.js + .NET)
1. Simple REST API (Beginner) 🎮 In-browser
2. URL Shortener (Beginner) 🎮 In-browser
3. Authentication System (Beginner) 🎮 In-browser
4. Blog API (Intermediate)
5. E-commerce API (.NET) (Intermediate)
6. Job Portal API (Intermediate)
7. File Upload Service (Intermediate)
8. Real-time Chat Backend (Advanced)
9. Booking System (.NET) (Advanced)
10. Advanced Auth + RBAC (.NET) (Advanced)

### Fullstack (Next.js + Node.js + .NET)
1. Task Management App (Beginner) 🎮 In-browser
2. Social Media Dashboard (Beginner) 🎮 In-browser
3. Learning Platform (Beginner) 🎮 In-browser
4. Real Estate Platform (Intermediate)
5. Project Management Tool (Intermediate)
6. Food Delivery App (Intermediate)
7. Content Management System (Intermediate)
8. Healthcare Appointment System (Advanced)
9. Event Management Platform (Advanced)
10. SaaS Application Builder (Advanced)

## 🎯 Points System

| Action | Points |
|--------|--------|
| Sign up | +50 |
| Complete a project | +100 |
| Read a flashcard | +10 |

## 🐍 Snake Game

Take a break from learning with a classic snake game featuring:
- Smooth canvas rendering
- Web Audio API-generated smooth jazz music
- High score tracking (localStorage)
- Mobile touch controls
- Pause/resume functionality

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Environment Variables
The app uses Supabase for authentication and storage — copy `.env.example` to `.env` and fill in your project values:

Then run `supabase/schema.sql` in the Supabase SQL Editor and follow the [Supabase setup guide](./SUPABASE.md). For Netlify, add the same variables under **Site configuration → Environment variables**.
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

## ⚡ Performance Optimizations

The application includes several performance optimizations:

### Code Splitting
- **Lazy-loaded routes**: All pages are lazy-loaded using React's `lazy()` and `Suspense`
- **Chunk splitting**: Vite automatically splits vendor code and large dependencies
- **Dynamic imports**: Auth components (Login/Signup) loaded separately

### Bundle Optimization
- **Tree shaking**: Unused code eliminated during build
- **Minification**: JavaScript and CSS minified with gzip compression
- **Asset optimization**: CSS extracted and optimized

### Build Stats (Production)
| Asset Type | Size (Raw) | Size (Gzipped) |
|------------|-----------|----------------|
| Main JS    | 251 KB    | 84 KB          |
| Main CSS   | 50 KB     | 9 KB           |
| Landing    | 19 KB     | 6 KB           |
| Vendor     | 60 KB     | 19 KB          |

### Runtime Performance
- **React 18**: Concurrent rendering for smoother UI
- **Framer Motion**: GPU-accelerated animations
- **Zustand**: Lightweight state management with persistence
- **Web Audio API**: Efficient audio generation for Snake game

## 📄 Database Schema (Supabase - Future)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT,
  points INTEGER DEFAULT 50,
  selected_stack TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Completed projects
CREATE TABLE user_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  project_id TEXT NOT NULL,
  github_link TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- Read flashcards
CREATE TABLE user_flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  flashcard_id TEXT NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

-- Project suggestions
CREATE TABLE project_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  stack TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  technologies TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Suggest new projects via the app
- Report bugs
- Improve the UI/UX
- Add new features

## 📝 License

MIT License - feel free to use this for your own learning platform.

---

Built with ❤️ for junior developers everywhere.
