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

// PATCH - Update with qualification data
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate role
    if (role && role !== "company" && role !== "engineer") {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Engineer field validation
    const validEngineerFields = ['active', 'passive', 'student_junior'];
    const validFdePersonas = ['pure_backend', 'forward_deployed', 'product_management'];
    const validAssessments = ['standard_leetcode', 'practical_simulation', 'portfolio_only'];
    const validSeniority = ['junior', 'senior', 'elite_staff'];

    // Company field validation
    const validTechnicalPain = ['research', 'implementation', 'maintenance'];
    const validUrgency = ['critical', 'planned', 'browsing'];
    const validEngagement = ['contract_project', 'contract_to_hire', 'full_time'];
    const validBottleneck = ['sourcing', 'vetting', 'closing'];

    // Build update object based on role
    const updateData: any = { role };

    if (role === "engineer") {
      if (body.current_status && !validEngineerFields.includes(body.current_status)) {
        return NextResponse.json({ error: "Invalid current_status" }, { status: 400 });
      }
      if (body.fde_persona && !validFdePersonas.includes(body.fde_persona)) {
        return NextResponse.json({ error: "Invalid fde_persona" }, { status: 400 });
      }
      if (body.assessment_preference && !validAssessments.includes(body.assessment_preference)) {
        return NextResponse.json({ error: "Invalid assessment_preference" }, { status: 400 });
      }
      if (body.seniority_rate && !validSeniority.includes(body.seniority_rate)) {
        return NextResponse.json({ error: "Invalid seniority_rate" }, { status: 400 });
      }

      updateData.current_status = body.current_status || null;
      updateData.fde_persona = body.fde_persona || null;
      updateData.assessment_preference = body.assessment_preference || null;
      updateData.seniority_rate = body.seniority_rate || null;
    } else if (role === "company") {
      if (body.technical_pain && !validTechnicalPain.includes(body.technical_pain)) {
        return NextResponse.json({ error: "Invalid technical_pain" }, { status: 400 });
      }
      if (body.hiring_urgency && !validUrgency.includes(body.hiring_urgency)) {
        return NextResponse.json({ error: "Invalid hiring_urgency" }, { status: 400 });
      }
      if (body.engagement_model && !validEngagement.includes(body.engagement_model)) {
        return NextResponse.json({ error: "Invalid engagement_model" }, { status: 400 });
      }
      if (body.hiring_bottleneck && !validBottleneck.includes(body.hiring_bottleneck)) {
        return NextResponse.json({ error: "Invalid hiring_bottleneck" }, { status: 400 });
      }

      updateData.technical_pain = body.technical_pain || null;
      updateData.hiring_urgency = body.hiring_urgency || null;
      updateData.engagement_model = body.engagement_model || null;
      updateData.hiring_bottleneck = body.hiring_bottleneck || null;
    }

    // Update the record
    console.log('[WAITLIST] Attempting qualification update:', {
      email: email.toLowerCase().trim(),
      role,
      fields: Object.keys(updateData)
    });

    const { data, error } = await supabase
      .from("waitlist")
      .update(updateData)
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
      { message: "Qualification data saved successfully", data },
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
