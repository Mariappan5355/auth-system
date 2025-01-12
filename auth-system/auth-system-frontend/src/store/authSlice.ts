import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: "public",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ role: string }>) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = "public";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
