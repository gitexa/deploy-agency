# Authentication Setup Guide

## Overview
FDE Agency now has a complete Supabase authentication system with email/password signup and login.

## Setup Steps

### 1. Configure Supabase Auth Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/auth/providers
2. Ensure **Email** provider is enabled
3. **Disable** email confirmation if you want instant login (recommended for development)
   - Go to Authentication → Providers → Email
   - Toggle off "Confirm email"
   
### 2. Run Database Setup SQL

The SQL script has been copied to your clipboard. Now:

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/sql/new
2. Paste the SQL (Cmd+V)
3. Click "Run"

This will:
- Create a `profiles` table
- Set up RLS policies for user profiles
- Create a trigger to auto-create profiles on signup

### 3. Update Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production on Vercel, set:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Test the Authentication Flow

1. **Restart your dev server** if it's running
2. Open http://localhost:3000
3. Click "Login" or "Sign Up" in the navigation
4. Try creating an account
5. Try logging in
6. Verify the user menu appears with your email
7. Try logging out

## Features Implemented

✅ **Email/Password Signup**
- Form validation with Zod
- Password confirmation
- Error handling
- Success messaging

✅ **Email/Password Login**
- Form validation
- Error handling
- Automatic session creation

✅ **User Session Management**
- Cookie-based sessions (secure, httpOnly)
- Automatic session refresh via middleware
- Client-side session sync

✅ **User Interface**
- Login/Signup modals
- User dropdown menu
- Conditional navigation (logged in/out states)
- Loading states

✅ **Security**
- Row-Level Security (RLS) on all user data
- Server-side session validation
- Automatic CSRF protection via Supabase

## API Endpoints

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Log in with credentials
- `POST /api/auth/logout` - Log out current user
- `GET /api/auth/user` - Get current user info
- `GET /api/auth/callback` - OAuth callback handler (for future OAuth)

## React Hooks

```typescript
import { useAuth, useUser } from '@/lib/context/AuthContext';

// Get full auth context
const { user, loading, signOut } = useAuth();

// Get just the user
const user = useUser();
```

## Next Steps (Optional)

### Add OAuth Providers
1. Go to Supabase Dashboard → Auth → Providers
2. Enable Google, GitHub, etc.
3. Add OAuth buttons to your auth forms

### Create Protected Routes
Add to `lib/supabase/middleware.ts`:
```typescript
// Protect routes by uncommenting:
if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
```

### Add User Profile Pages
Create pages like:
- `/app/dashboard/page.tsx` - User dashboard
- `/app/profile/page.tsx` - Edit profile

## Troubleshooting

### "Email confirmation required" message
- Disable email confirmation in Supabase → Auth → Email provider settings

### Session not persisting
- Ensure middleware is running (check `middleware.ts` is at project root)
- Check that cookies are enabled in browser

### "Invalid credentials" on login
- Verify email/password are correct
- Check Supabase logs: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/logs/explorer

## Files Created

**Supabase Clients:**
- `lib/supabase/server.ts` - Server Components client
- `lib/supabase/client.ts` - Client Components client  
- `lib/supabase/middleware.ts` - Middleware client

**API Routes:**
- `app/api/auth/signup/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/user/route.ts`
- `app/api/auth/callback/route.ts`

**UI Components:**
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`
- `components/auth/AuthModal.tsx`
- `components/UserMenu.tsx`

**Context:**
- `lib/context/AuthContext.tsx`

**Middleware:**
- `middleware.ts`

**Database:**
- `supabase-auth-setup.sql`
