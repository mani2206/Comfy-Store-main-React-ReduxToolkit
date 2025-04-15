import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Themes Data
const themes = {
  winter: "winter",
  night: "night",
};

// Getting theme from the local storage
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

// Getting user from the local storage
const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

// Initial State
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // Reducers
  reducers: {
    // LogIn User
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    // LogOut User
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    // Toggle Theme
    toggleTheme: (state) => {
      const { winter, night } = themes;
      state.theme = state.theme === night ? winter : night;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const allSelectUser = (state) =>state.userState.user
console.log(allSelectUser,"allSelectUser--");


export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
