-- Member-as-partner credit columns for team_members.
-- Idempotent: safe to run more than once.
-- Run in Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

ALTER TABLE team_members ADD COLUMN IF NOT EXISTS partner_brand TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS partner_role TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS partner_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS partner_logo_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS partner_active BOOLEAN NOT NULL DEFAULT FALSE;

-- Optional: index for the public render filter
CREATE INDEX IF NOT EXISTS team_members_partner_active_idx
  ON team_members (partner_active)
  WHERE partner_active = TRUE;

COMMENT ON COLUMN team_members.partner_brand IS 'Display name of the volunteer''s project shown on public Partners grid.';
COMMENT ON COLUMN team_members.partner_role IS 'Short tagline / role for the partner card. Max ~80 chars.';
COMMENT ON COLUMN team_members.partner_url IS 'Optional click-through URL on the partner card.';
COMMENT ON COLUMN team_members.partner_logo_url IS 'Optional https logo URL for the partner card.';
COMMENT ON COLUMN team_members.partner_active IS 'When TRUE, the volunteer''s partner credit is rendered on public Partners grids.';
