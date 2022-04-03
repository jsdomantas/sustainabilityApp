import auth from '@react-native-firebase/auth';

export const logout = async () => {
  // await supabase.auth.signOut();
  await auth().signOut();
};
