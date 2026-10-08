/**
 * Supabase Seeder Script
 * ---------------------
 * Reads places-data.json and bulk-inserts all records into your Supabase `places` table.
 *
 * Run ONCE after creating the table:
 *   node scripts/seed-supabase.mjs
 *
 * Prerequisites:
 *   - .env.local must have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   - The `places` table must already exist (run supabase-setup.sql first)
 *   - @supabase/supabase-js must be installed
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// --- Load .env.local manually (Node doesn't auto-load it) ---
import { readFileSync as rf } from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");

try {
  const envContent = rf(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
  console.log("✅ Loaded .env.local");
} catch {
  console.error("❌ Could not load .env.local — make sure it exists in the project root.");
  process.exit(1);
}

// --- Supabase client ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Load places data ---
const dataPath = join(__dirname, "../places-data.json");
const rawPlaces = JSON.parse(readFileSync(dataPath, "utf8"));

console.log(`📦 Found ${rawPlaces.length} places to seed.`);

// --- Batch insert ---
const BATCH_SIZE = 50;

async function seed() {
  let totalInserted = 0;
  let totalSkipped = 0;

  for (let i = 0; i < rawPlaces.length; i += BATCH_SIZE) {
    const batch = rawPlaces.slice(i, i + BATCH_SIZE).map((place) => ({
      name: place.name,
      district: place.district,
      description: place.description,
    }));

    const { data, error } = await supabase
      .from("places")
      .upsert(batch, { onConflict: "name" })
      .select("id");

    if (error) {
      console.error(`❌ Error inserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
      totalSkipped += batch.length;
    } else {
      totalInserted += data?.length ?? 0;
      console.log(
        `✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(rawPlaces.length / BATCH_SIZE)} — inserted ${data?.length ?? 0} records`
      );
    }
  }

  console.log("\n🎉 Seeding complete!");
  console.log(`   ✅ Inserted/updated: ${totalInserted}`);
  if (totalSkipped > 0) {
    console.log(`   ⚠️  Skipped (errors): ${totalSkipped}`);
  }
}

seed().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
