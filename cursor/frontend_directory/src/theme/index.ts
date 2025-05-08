import { createTheme, ThemeOptions } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#5c6bc0" },
      secondary: { main: "#9575cd" },
      background: {
        default: mode === "light" ? "#eceff1" : "#263238",
        paper: mode === "light" ? "#fff" : "#263238",
      },
      text: {
        primary: "#263238",
        secondary: "#78909c",
      },
      error: { main: "#e57373" },
      success: { main: "#81c784" },
      info: { main: "#4db6ac" },
    },
    typography: {
      fontFamily: ["Segoe UI", "Noto Sans JP", "sans-serif"].join(","),
      h1: { fontSize: 24 },
      h2: { fontSize: 18 },
      h3: { fontSize: 16 },
      body1: { fontSize: 15 },
      body2: { fontSize: 14 },
    },
  } as ThemeOptions);
