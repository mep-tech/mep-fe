import { Navigate, createBrowserRouter } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import LandingPage from "../pages/home/LandingPage";
import ProjectPage from "../pages/home/ProjectPage";
import ProjectsPage from "../pages/home/ProjectsPage";

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
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/projects/:id",
    element: <ProjectPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default routes;
