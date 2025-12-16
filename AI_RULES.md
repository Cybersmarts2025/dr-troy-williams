# AI Rules for This App

This document guides AI and developers working on the project. Keep changes simple, maintainable, and consistent with the existing stack.

## Tech Stack (5–10 bullets)
- React + TypeScript single-page application, built with Vite.
- React Router for navigation; all routes are defined in src/App.tsx.
- Tailwind CSS for styling; responsive design is required using Tailwind utility classes.
- UI components use shadcn/ui (powered by Radix UI); these components are already installed.
- lucide-react is the icon library used throughout the app.
- Supabase is integrated for auth, database, storage, and serverless functions (see supabase/functions/* and src/integrations/supabase/client.ts).
- Notifications use the shadcn/ui toast system (src/components/ui/toast.ts and src/components/ui/use-toast.ts) and/or Sonner (src/components/ui/sonner.tsx).
- File structure: components in src/components/, pages in src/pages/, and the default page is src/pages/Index.tsx.
- Assets live under public/ and src/assets; follow accessibility best practices and use semantic HTML.
- Build tooling via Tailwind, PostCSS, and Vite; TypeScript configs in tsconfig*.json.

## Library Usage Rules
- General
  - Use TypeScript everywhere. Keep components small (≤100 lines when possible), one component or hook per file.
  - Do not overengineer: implement only what’s requested and fully complete each feature without placeholders.
  - Prefer existing utilities (e.g., src/lib/utils.ts, src/utils/*) before adding new helpers.

- Routing
  - Keep all routes in src/App.tsx.
  - When adding new pages, place them in src/pages/ and update src/pages/Index.tsx to surface new components so they’re visible in the preview.

- UI & Styling
  - Use shadcn/ui components for UI whenever possible (buttons, dialogs, sheets, drawers, forms, tables, etc.).
  - Do not edit files in src/components/ui/ (the shadcn/ui library). If you need variations, create new wrapper components in src/components/.
  - Use Tailwind CSS for all styling; avoid inline styles and custom CSS unless absolutely necessary (prefer src/styles/* if needed).
  - Use Radix UI primitives only when shadcn/ui does not cover the requirement, and compose them in new components.

- Icons
  - Use lucide-react for all icons. Do not introduce other icon libraries.

- Notifications
  - Use shadcn/ui toast via src/components/ui/use-toast.ts or Sonner (src/components/ui/sonner.tsx) for all notifications.
  - Show a toast for important events (success, error, progress) and keep messages concise.

- Forms & Validation
  - Use shadcn/ui form components where applicable.
  - Prefer existing validation utilities in src/utils/formValidation.ts. If schema validation is needed, match existing patterns in the repo.

- State & Context
  - Use React Contexts where already established (e.g., src/contexts/AuthContext.tsx, src/contexts/ThemeContext.tsx).
  - Avoid adding complex state libraries; stick to React hooks and context.

- Data & Server-Side (Supabase)
  - Use src/integrations/supabase/client.ts for Supabase client access and src/integrations/supabase/types.ts for types.
  - For backend logic or long-running tasks, prefer Supabase edge functions under supabase/functions/*.
  - Read configuration and secrets from environment variables (.env); do not hard-code secrets in source files.
  - If a feature needs auth, database, or server-side functionality and isn’t present, add Supabase integration via the provided UI action before proceeding.

- File Structure & Conventions
  - Place components in src/components/, hooks in src/hooks/, pages in src/pages/.
  - Name new files clearly; keep directory names lowercase (e.g., src/pages, src/components).
  - Never modify or move existing library component files in src/components/ui/.

- Accessibility & Animations
  - Maintain accessibility (ARIA, focus management, keyboard navigation); existing hooks like src/hooks/useFocusTrap.ts and src/hooks/useReducedMotion.ts can help.
  - Use Tailwind and small, performant animations; prefer CSS classes from src/styles/ and avoid heavy animation libraries.

- App Commands
  - Do not instruct users to run shell commands; use the UI action buttons for Rebuild, Restart, or Refresh when needed.