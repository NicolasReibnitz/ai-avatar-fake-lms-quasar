import { createClient } from '@supabase/supabase-js';
import { boot } from 'quasar/wrappers';
import type { Database } from 'types/supabase';

// ✅ Replace with your actual project values
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default boot(({ app }) => {
	// You can provide it globally if needed
	app.config.globalProperties.$supabase = supabase;
});
