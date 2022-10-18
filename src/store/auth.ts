import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AuthState = {
  name: string;
  role: string;
  isAuthenticated: boolean;
}

const loadUser = () => {
  const name = localStorage.getItem('name') ?? '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('role') ?? '';

  return {
    name, role, isAuthenticated
  }
}

const initialState: AuthState = loadUser();

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    login(state: AuthState, action: PayloadAction<{ name: string, role: string }>) {
      const { name, role } = action.payload;
      state.name = name;
      state.role = role;
      state.isAuthenticated = true;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);
    },
    logout(state: AuthState) {
      state.name = '';
      state.role = '';
      state.isAuthenticated = false;

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
