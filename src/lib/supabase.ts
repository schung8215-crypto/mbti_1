import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  mbti_type: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_stem: string;
  birth_branch: string;
  birth_element: string;
  birth_yin_yang: string;
  timezone: string;
  created_at: string;
}

export interface CreateUserData {
  mbti_type: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_stem: string;
  birth_branch: string;
  birth_element: string;
  birth_yin_yang: string;
  timezone?: string;
}

export async function saveUser(userData: CreateUserData): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error("Error saving user:", error);
    return null;
  }

  return data;
}
