import { UserState } from '@/types/states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: UserState = {
  user: null,
  isAuth: false,
  updateTrigger: false,
  isLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateData: (state) => {
      state.updateTrigger = !state.updateTrigger;
    },
  },
});

export const { login, logout, updateData, setLoading } = userSlice.actions;

export default userSlice.reducer;
