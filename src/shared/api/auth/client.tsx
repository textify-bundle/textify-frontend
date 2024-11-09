import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://fdnzbbyiwwzvandoyopt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbnpiYnlpd3d6dmFuZG95b3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MjM2MzUsImV4cCI6MjA0NjQ5OTYzNX0.R7mOkPgAb2azlYKuFuDXzyGXjaHYI99g60mej_eEIEo'
export const supabase= createClient(supabaseUrl, supabaseKey);
