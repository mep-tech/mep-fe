import { StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./config/routes.config";
import "./index.css";
import CustomThemeProvider from "./theme/mui.theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
			<CustomThemeProvider>
				<RouterProvider router={routes} />
			</CustomThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
