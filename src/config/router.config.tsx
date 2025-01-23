import { createBrowserRouter, redirect } from "react-router-dom"
import HomePage from "../pages/home/home-page"
import LoginPage from "../pages/login/login.page"
import RegisterPage from "../pages/register/register.page"
import DashboardPage from "../pages/dashboard/dashboard.page"

const Routing = createBrowserRouter([
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

export default Routing