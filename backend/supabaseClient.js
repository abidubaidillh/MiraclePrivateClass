// File: supabaseClient.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Gunakan service role key untuk akses penuh
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;