import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import HomePage from "../pages/home/home-page"
import LoginPage from "../pages/login/login.page"
import RegisterPage from "../pages/register/register.page"
import DashboardPage from "../pages/dashboard/dashboard.page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },

  
])

const Routing: React.FC = () => {
return(<>

<RouterProvider router={router} />

</>)
  };
  
  

export default Routing