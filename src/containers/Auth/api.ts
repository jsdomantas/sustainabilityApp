import { supabase } from '../../utilities/supabase';

export const loginWithEmail = async (email: string, password: string) => {
  const data = await supabase.auth.signIn({ email, password });
  console.log(data);
  return data;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const data = await supabase.auth.signUp({ email, password });
  console.log(data);
  return data;
};
