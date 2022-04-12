import { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const selectUserRole = (state: RootState) =>
  state.user.profile?.user?.role;
