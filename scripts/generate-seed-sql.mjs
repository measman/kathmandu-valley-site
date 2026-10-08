/**
 * Generates a SQL INSERT file from places-data.json
 * Run: node scripts/generate-seed-sql.mjs
 * Then paste the output SQL into Supabase SQL Editor
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "../places-data.json");
const outPath = join(__dirname, "../supabase-seed.sql");

const places = JSON.parse(readFileSync(dataPath, "utf8"));

function escape(str) {
  return str.replace(/'/g, "''");
}

const rows = places.map(
  (p) => `  ('${escape(p.name)}', '${escape(p.district)}', '${escape(p.description)}')`
);

const sql = `-- Auto-generated seed SQL from places-data.json
-- Paste this into Supabase SQL Editor and click Run

INSERT INTO places (name, district, description) VALUES
${rows.join(",\n")}
ON CONFLICT (name) DO UPDATE
  SET district = EXCLUDED.district,
      description = EXCLUDED.description;
`;

writeFileSync(outPath, sql, "utf8");
console.log(`✅ Generated supabase-seed.sql with ${places.length} places.`);
console.log(`📁 File: ${outPath}`);
