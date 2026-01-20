-- FDE Agency - Waitlist Qualification Fields Migration
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/akattiztebrarmuaqgzj/sql/new

-- 1. Add qualification columns for engineers
alter table waitlist add column if not exists current_status text check (current_status in ('active', 'passive', 'student_junior'));
alter table waitlist add column if not exists fde_persona text check (fde_persona in ('pure_backend', 'forward_deployed', 'product_management'));
alter table waitlist add column if not exists assessment_preference text check (assessment_preference in ('standard_leetcode', 'practical_simulation', 'portfolio_only'));
alter table waitlist add column if not exists seniority_rate text check (seniority_rate in ('junior', 'senior', 'elite_staff'));

-- 2. Add qualification columns for companies
alter table waitlist add column if not exists technical_pain text check (technical_pain in ('research', 'implementation', 'maintenance'));
alter table waitlist add column if not exists hiring_urgency text check (hiring_urgency in ('critical', 'planned', 'browsing'));
alter table waitlist add column if not exists engagement_model text check (engagement_model in ('contract_project', 'contract_to_hire', 'full_time'));
alter table waitlist add column if not exists hiring_bottleneck text check (hiring_bottleneck in ('sourcing', 'vetting', 'closing'));

-- 3. Create indexes for common queries
create index if not exists waitlist_role_idx on waitlist (role);
create index if not exists waitlist_current_status_idx on waitlist (current_status) where role = 'engineer';
create index if not exists waitlist_hiring_urgency_idx on waitlist (hiring_urgency) where role = 'company';

-- 4. Verify the columns were added
select 
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_name = 'waitlist'
  and column_name in (
    'current_status', 'fde_persona', 'assessment_preference', 'seniority_rate',
    'technical_pain', 'hiring_urgency', 'engagement_model', 'hiring_bottleneck'
  )
order by column_name;

-- 5. Create a view for analytics (optional but recommended)
create or replace view waitlist_analytics as
select
  role,
  count(*) as total_count,
  -- Engineer metrics
  count(*) filter (where current_status = 'active') as engineers_active,
  count(*) filter (where fde_persona = 'forward_deployed') as fde_match,
  count(*) filter (where assessment_preference = 'practical_simulation') as prefer_simulation,
  count(*) filter (where seniority_rate = 'elite_staff') as elite_engineers,
  -- Company metrics
  count(*) filter (where technical_pain = 'implementation') as companies_impl_gap,
  count(*) filter (where hiring_urgency = 'critical') as urgent_hiring,
  count(*) filter (where hiring_bottleneck = 'vetting') as vetting_bottleneck
from waitlist
group by role;

-- 6. Grant access to the view
grant select on waitlist_analytics to authenticated;
grant select on waitlist_analytics to anon;

-- 7. Test the view
select * from waitlist_analytics;
