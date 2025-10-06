import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vivcxxkzyujiofpqpqol.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpdmN4eGt6eXVqaW9mcHFwcW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDM5NzQsImV4cCI6MjA3NDc3OTk3NH0.FDHCF14rKB0VdiduakzVSkiJPe-pGKDMPJkG20JVD0E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

