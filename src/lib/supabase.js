import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
// Values supplied by the user on 2026-10-29. GitHub Secrets should still carry the same values for EAS builds.
// When they are still placeholders, the app runs in clearly-labelled DEMO mode
// with local data, so the UI can be tested without a backend.
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://zeuaksvwdvpxcdqtymwa.supabase.co';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9nC5-rAgfi8j54k_czVbgA__tmvAlTn';
export const isPlaceholder = (v) => !v || v.includes('YOUR_');
export const DEMO_MODE = isPlaceholder(SUPABASE_URL) || isPlaceholder(SUPABASE_ANON_KEY);
export const supabase = DEMO_MODE ? null : createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
