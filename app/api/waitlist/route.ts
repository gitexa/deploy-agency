import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Force Node.js runtime and dynamic rendering
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST - Initial email signup
export async function POST(request: Request) {
  // Log environment check for debugging
  console.log('[WAITLIST] Environment check:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30),
    nodeEnv: process.env.NODE_ENV
  });
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    console.log('[WAITLIST] Attempting insert:', { email: email.toLowerCase().trim() });

    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: email.toLowerCase().trim(),
          source: "landing_page",
        },
      ])
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      console.error('[WAITLIST] Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      return NextResponse.json(
        {
          error: "Failed to join waitlist",
          debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully joined waitlist", data },
      { status: 201 }
    );
  } catch (error) {
    console.error('[WAITLIST] API error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        debug: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// PATCH - Update with poll data
export async function PATCH(request: Request) {
  try {
    const { email, role, challenge } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate role if provided
    if (role && role !== "company" && role !== "engineer") {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Update the record
    console.log('[WAITLIST] Attempting update:', { email: email.toLowerCase().trim(), role, hasChallenge: !!challenge });

    const { data, error } = await supabase
      .from("waitlist")
      .update({
        role: role || null,
        priority_challenge: challenge || null,
      })
      .eq("email", email.toLowerCase().trim())
      .select()
      .single();

    if (error) {
      console.error('[WAITLIST] Supabase update error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      return NextResponse.json(
        {
          error: "Failed to update waitlist entry",
          debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Email not found in waitlist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Poll data saved successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error('[WAITLIST] API error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        debug: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
