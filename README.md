# FDE Agency

Professional agency connecting elite Forward Deployed Engineers with companies building AI systems.

## Overview

FDE Agency is a professional talent agency that matches vetted Forward Deployed Engineers with companies who need to build, deploy, and maintain AI systems in production. We focus on FDEs who excel at messy integrations, client collaboration, and shipping real solutions.

## Key Features

- **Qualification-Based Waitlist**: Collects high-signal data from both engineers and companies
- **User Authentication**: Supabase-powered auth with email/password signup
- **Multi-Role Support**: Separate flows for engineers seeking work and companies hiring
- **Market Validation**: Built-in analytics to validate product-market fit

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Analytics**: Vercel Analytics
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run database migrations:

- Execute `supabase-setup.sql` in Supabase SQL Editor
- Execute `supabase-auth-setup.sql` for auth tables
- Execute `supabase-waitlist-qualification.sql` for qualification fields

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Documentation

- [`AUTH_SETUP.md`](AUTH_SETUP.md) - Authentication setup guide
- [`QUALIFICATION_SETUP.md`](QUALIFICATION_SETUP.md) - Waitlist qualification guide

## Project Structure

```
fde-agency/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── qualification/    # Qualification flow components
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and configs
│   ├── context/          # React contexts
│   └── supabase/         # Supabase clients
└── supabase-*.sql        # Database migrations

```

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production

```bash
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_SITE_URL=https://fde.agency
```

## Features in Detail

### Waitlist with Qualification

- Email collection
- Role selection (Engineer vs Company)
- 4 targeted qualification questions per role
- Success metrics tracking

### Authentication System

- Email/password signup and login
- User profiles
- Protected routes via middleware
- Session management

### Analytics

Built-in views to track:
- Engineer liquidity (% active vs passive)
- FDE persona match (% forward deployed)
- Assessment preference (validation of simulation product)
- Company urgency and pain points

## Contributing

This is a private project for FDE Agency.

## License

Proprietary - All rights reserved © 2026 FDE Agency
