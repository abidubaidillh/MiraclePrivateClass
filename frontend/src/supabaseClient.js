import { createClient } from "@supabase/supabase-js";

// 🔑 ganti dengan data dari Project Settings > API di Supabase
const supabaseUrl = "https://heqtbeemmjcfrjeafqkm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcXRiZWVtbWpjZnJqZWFmcWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MDY3OTAsImV4cCI6MjA3MDk4Mjc5MH0.Ug7ftsA4h___i7ZZXQ-_EBrXdB33TqfBH74Y9xHOS5I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);