import { createClient } from '@supabase/supabase-js';

// ЗАМЕНИТЬ после создания проекта в Supabase
const SUPABASE_URL = 'https://ewsioerxqdwegjcrpknb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_86l5AANJ9Qp5AMUGEZScAg_a3sNUlo9';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
