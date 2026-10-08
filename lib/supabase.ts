import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PlaceRow = {
  id: number;
  name: string;
  district: string;
  description: string;
  created_at: string;
};

/**
 * Fetches all raw place rows from Supabase, ordered by district then name.
 * Falls back to an empty array on error.
 */
export async function fetchRawPlaces(): Promise<
  { name: string; district: string; description: string }[]
> {
  const { data, error } = await supabase
    .from("places")
    .select("name, district, description")
    .order("district", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("[Supabase] fetchRawPlaces error:", error.message);
    return [];
  }

  return data ?? [];
}
