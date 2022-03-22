import { supabase } from '../../utilities/supabase';

export const logout = async () => {
  await supabase.auth.signOut();
};
