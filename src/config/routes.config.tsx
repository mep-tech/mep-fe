import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default routes;
