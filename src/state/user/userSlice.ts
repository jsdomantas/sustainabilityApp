import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Profile = {
  title: string;
  user?: {
    role: 'basic' | 'business';
  };
};

export interface UserSlice {
  isLoggedIn: boolean;
  profile: Profile | null;
}

const initialState: UserSlice = {
  isLoggedIn: false,
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      console.log('payload:');
      console.log(action.payload);
      state.profile = action.payload;

      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
