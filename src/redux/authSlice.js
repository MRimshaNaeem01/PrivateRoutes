import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    username: null,
    isAuthenticated: false,
    role: null,
  },
  reducers: {
    settingUser: (state, action) => {
      console.log('settingUser', action)
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      console.log('setAuthenticated', action)

      state.isAuthenticated = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRole: (state, action) =>{
      state.role = action.payload;
    },
    setLogout: (state) =>{
      state.user = null;
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;

    }
  },
});

export const { settingUser, setAuthenticated, setUsername , setRole, setLogout} = authSlice.actions;
export default authSlice.reducer;
