"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

const CustomThemeProvider = (props: React.PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
