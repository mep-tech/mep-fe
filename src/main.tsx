import { StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./config/routes.config";
import "./index.css";
import { store } from "./store/store";
import CustomThemeProvider from "./theme/mui.theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <CustomThemeProvider>
          <RouterProvider router={routes} />
        </CustomThemeProvider>
      </Provider>
    </StyledEngineProvider>
  </StrictMode>
);
