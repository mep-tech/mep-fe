"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 440,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  palette: {
    secondary: {
      main: "#0075C9",
    },
    primary: {
      main: "#004C83",
      dark: "#283747",
    },
    background: {
      default: "#F6F6F6",
      paper: "#FFFFFF",
    },
    common: {
      black: "#272727",
      white: "#FFFFFF",
    },
    muted: {
      main: "#D9D9D9",
    },
    dark: {
      main: "#272727",
      foreground: "#343434",
    },
  },
});

const CustomThemeProvider = (props: React.PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
