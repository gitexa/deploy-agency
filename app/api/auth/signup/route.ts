import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || null,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
      },
    });

    if (error) {
      console.error('[AUTH SIGNUP] Error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return NextResponse.json(
        {
          message: 'Please check your email to confirm your account',
          requiresEmailConfirmation: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: data.user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[AUTH SIGNUP] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
