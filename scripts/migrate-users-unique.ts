import { config } from 'dotenv';
config({ path: '.env.local' });
import postgres from 'postgres';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL!;
const sql = postgres(url, { prepare: false });

async function main() {
  await sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_clerk_user_id_unique`;
  await sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_clerk_user_id_key`;
  await sql`ALTER TABLE users ADD CONSTRAINT users_clerk_user_household_unique UNIQUE (clerk_user_id, household_id)`;
  console.log('✓ users table: dropped old unique, added composite unique');
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });
