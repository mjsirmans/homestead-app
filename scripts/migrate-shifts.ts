import { config } from 'dotenv';
config({ path: '.env.local' });
import postgres from 'postgres';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL!;
const sql = postgres(url, { prepare: false });

async function main() {
  await sql`DO $$ BEGIN
    CREATE TYPE shift_status AS ENUM ('open', 'claimed', 'cancelled', 'done');
  EXCEPTION WHEN duplicate_object THEN null; END $$`;

  await sql`CREATE TABLE IF NOT EXISTS shifts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
    created_by_user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    claimed_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    title text NOT NULL,
    for_whom text,
    notes text,
    starts_at timestamp NOT NULL,
    ends_at timestamp NOT NULL,
    rate_cents integer,
    status shift_status NOT NULL DEFAULT 'open',
    claimed_at timestamp,
    created_at timestamp NOT NULL DEFAULT now()
  )`;

  await sql`CREATE INDEX IF NOT EXISTS shifts_household_status_idx ON shifts(household_id, status)`;
  await sql`CREATE INDEX IF NOT EXISTS shifts_starts_at_idx ON shifts(starts_at)`;

  console.log('✓ shifts table created');
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });
