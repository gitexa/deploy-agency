# Qualification Questionnaire Setup

## Overview
FDE Agency's waitlist now includes a comprehensive qualification questionnaire that collects high-signal validation data from both engineers and companies. This replaces the simple poll with 4 targeted questions for each persona.

## Setup Steps

### 1. Run Database Migration

The database migration SQL is **already in your clipboard**. Now:

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/sql/new
2. Paste the SQL (Cmd+V)
3. Click "Run"

This will:
- Add 8 new qualification columns to the `waitlist` table
- Create indexes for common queries
- Create an analytics view for tracking success metrics

### 2. Test the Qualification Flow

**For Engineers:**
1. Go to http://localhost:3000
2. Click "Join Waitlist"
3. Enter your email
4. Select "Looking for Work" (Engineer)
5. Answer the 4 questions:
   - Current Status (active/passive/student_junior)
   - FDE Persona (pure_backend/forward_deployed/product_management)
   - Assessment Preference (standard_leetcode/practical_simulation/portfolio_only)
   - Seniority/Rate (junior/senior/elite_staff)
6. Complete the flow

**For Companies:**
1. Go to http://localhost:3000
2. Click "Join Waitlist"
3. Enter your email
4. Select "Hiring Talent" (Company)
5. Answer the 4 questions:
   - Technical Pain Point (research/implementation/maintenance)
   - Hiring Urgency (critical/planned/browsing)
   - Engagement Model (contract_project/contract_to_hire/full_time)
   - Hiring Bottleneck (sourcing/vetting/closing)
6. Complete the flow

### 3. Verify Data in Supabase

Check that the data is being stored correctly:

```sql
-- View all waitlist entries with qualification data
SELECT 
  email,
  role,
  created_at,
  -- Engineer fields
  current_status,
  fde_persona,
  assessment_preference,
  seniority_rate,
  -- Company fields
  technical_pain,
  hiring_urgency,
  engagement_model,
  hiring_bottleneck
FROM waitlist
ORDER BY created_at DESC
LIMIT 20;
```

### 4. Check Analytics View

```sql
-- View validation metrics
SELECT * FROM waitlist_analytics;
```

## What Was Changed

### New Files Created (4)
1. **`components/QualificationModal.tsx`** - Multi-step qualification wizard
2. **`components/qualification/QuestionCard.tsx`** - Reusable question wrapper
3. **`components/qualification/RadioOption.tsx`** - Styled radio button component
4. **`supabase-waitlist-qualification.sql`** - Database migration

### Files Modified (2)
1. **`app/page.tsx`** - Replaced PollModal with QualificationModal
2. **`app/api/waitlist/route.ts`** - Added validation for 8 new qualification fields

### Files Removed (1)
- **`components/PollModal.tsx`** - Replaced by QualificationModal

## Validation Questions

### For Engineers (4 questions)

**Q1: Current Status (Liquidity Check)**
- Active: Ready to interview and start within 2-4 weeks
- Passive: Employed, but open to the right "Special Ops" role
- Student/Junior: Looking for internships or entry-level roles

**Q2: FDE Litmus Test (Skill Validation)**
- Pure Backend: I prefer deep coding in isolation; keep me away from clients
- Forward Deployed: I thrive on messy integrations, client calls, and shipping to production
- Product/Management: I prefer managing roadmaps over writing code

**Q3: Assessment Style (Pain Validation)**
- Standard: I prefer LeetCode/Algorithmic puzzles
- Practical: I prefer debugging a broken AI agent or fixing a real repo
- Portfolio: Judge me solely on my GitHub/Previous work

**Q4: Seniority/Rate (Economic Validation)**
- Junior: < $80k/year (I need mentorship)
- Senior: $120k-$200k (I ship independently)
- Elite/Staff: $250k+ (I architect systems and lead teams)

### For Companies (4 questions)

**Q1: Technical Pain Point (Why Validation)**
- Research: We need to train/fine-tune custom models (Need PhDs)
- Implementation: We have APIs/Models but can't integrate them into our legacy stack
- Maintenance: We need someone to fix bugs in existing software

**Q2: Urgency & Timeline (Liquidity Validation)**
- Critical: We needed this person yesterday (High willingness to pay)
- Planned: Hiring for next quarter
- Browsing: Just curious about AI hiring

**Q3: Engagement Model (Business Model Validation)**
- Contract/Project: Short-term "SWAT team" deployment (3-6 months)
- Contract-to-Hire: Trial period before full-time
- Full-Time: Permanent role only

**Q4: Hiring Bottleneck (Pain Validation)**
- Sourcing: We can't find engineers who understand AI and legacy systems
- Vetting: We find them, but assessing their skills takes too much engineering time
- Closing: We can't compete on salary with big tech

## Success Metrics

### Engineer Validation Targets
- **Liquidity**: >30% selecting "Active"
- **FDE Match**: >60% selecting "Forward Deployed"
- **Pain Point**: >70% selecting "Practical" assessment
- **Economics**: Track distribution across seniority levels

### Company Validation Targets
- **Pain Match**: >50% selecting "Implementation"
- **Urgency**: >40% selecting "Critical"
- **Model Fit**: Track "Contract" vs "Full-Time" preferences
- **Vetting Pain**: High % selecting "Vetting" validates simulation product

## Analytics Queries

### Engineer Metrics
```sql
SELECT 
  COUNT(*) as total_engineers,
  COUNT(*) FILTER (WHERE current_status = 'active') as active_count,
  COUNT(*) FILTER (WHERE fde_persona = 'forward_deployed') as fde_match,
  COUNT(*) FILTER (WHERE assessment_preference = 'practical_simulation') as prefer_simulation,
  ROUND(100.0 * COUNT(*) FILTER (WHERE current_status = 'active') / COUNT(*), 1) as active_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE fde_persona = 'forward_deployed') / COUNT(*), 1) as fde_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE assessment_preference = 'practical_simulation') / COUNT(*), 1) as simulation_pct
FROM waitlist
WHERE role = 'engineer';
```

### Company Metrics
```sql
SELECT 
  COUNT(*) as total_companies,
  COUNT(*) FILTER (WHERE technical_pain = 'implementation') as impl_gap,
  COUNT(*) FILTER (WHERE hiring_urgency = 'critical') as urgent,
  COUNT(*) FILTER (WHERE hiring_bottleneck = 'vetting') as vetting_issue,
  ROUND(100.0 * COUNT(*) FILTER (WHERE technical_pain = 'implementation') / COUNT(*), 1) as impl_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE hiring_urgency = 'critical') / COUNT(*), 1) as urgent_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE hiring_bottleneck = 'vetting') / COUNT(*), 1) as vetting_pct
FROM waitlist
WHERE role = 'company';
```

### Seniority Distribution
```sql
SELECT 
  seniority_rate,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as percentage
FROM waitlist
WHERE role = 'engineer' AND seniority_rate IS NOT NULL
GROUP BY seniority_rate
ORDER BY 
  CASE seniority_rate
    WHEN 'elite_staff' THEN 1
    WHEN 'senior' THEN 2
    WHEN 'junior' THEN 3
  END;
```

## User Experience Flow

1. **Email Collection** (WaitlistModal)
   - User enters email
   - Email is saved to waitlist table

2. **Role Selection** (QualificationModal Step 1)
   - User selects Company or Engineer
   - Modal shows role-specific icon and description

3. **Qualification Questions** (QualificationModal Steps 2-5)
   - 4 targeted questions based on role
   - Progress indicator shows X of 5
   - Back button allows correction
   - Next button proceeds to next question
   - Last question shows "Complete" button

4. **Success** (QualificationModal Step 6)
   - Confirmation message
   - Data saved to database
   - Modal can be closed

## Features

✅ **Multi-Step Wizard**
- Smooth transitions between steps
- Progress tracking
- Back navigation
- Form validation

✅ **Role-Specific Questions**
- Engineers get 4 targeted questions
- Companies get 4 different questions
- Smart validation per role

✅ **Database Schema**
- 8 new columns with CHECK constraints
- Indexed for query performance
- Analytics view for metrics

✅ **API Validation**
- Server-side validation of all fields
- Role-based field requirements
- Helpful error messages

✅ **Beautiful UI**
- Consistent with existing design
- Animated transitions
- Accessible radio buttons
- Clear descriptions

## Troubleshooting

### "Invalid [field_name]" Error
- Ensure database migration ran successfully
- Check that CHECK constraints were created
- Verify API validation logic matches database constraints

### Questions Not Showing
- Check browser console for errors
- Verify QualificationModal is imported correctly
- Ensure email is passed to modal

### Data Not Saving
- Check Supabase logs for RLS policy issues
- Verify API endpoint is receiving correct data
- Check network tab in browser DevTools

## Next Steps (Optional)

### Add Analytics Dashboard
Create a dashboard page to visualize:
- Real-time signup metrics
- Conversion rates per question
- Validation metric trends
- A/B test different question wording

### Export Data
```sql
-- Export to CSV for analysis
COPY (
  SELECT * FROM waitlist
  WHERE created_at > NOW() - INTERVAL '30 days'
) TO '/tmp/waitlist_export.csv' CSV HEADER;
```

### Add Email Notifications
Send different email sequences based on:
- Engineer vs Company
- Current status (Active engineers get faster follow-up)
- Hiring urgency (Critical companies get priority)
- Assessment preference (Simulation fans get demo invite)
