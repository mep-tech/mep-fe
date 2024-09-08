import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import Contact from "../pages/contact/Contact";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default routes;
