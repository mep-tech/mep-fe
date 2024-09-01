import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./config/routes.config";
import CustomThemeProvider from "./theme/mui.theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <RouterProvider router={routes} />
    </CustomThemeProvider>
  </StrictMode>
);
