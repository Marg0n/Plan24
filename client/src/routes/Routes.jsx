import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/Login";
import ErrorPage from "../pages/shared/ErrorPage";
import Register from "../pages/authentication/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Root from "../layouts/Root";
import LandingPage from "../pages/landingPage/LandingPage";
import Profile from "../components/dashboard/Profile";
import AddTask from "../components/dashboard/AddTask";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import UpdateTask from "../components/dashboard/UpdateTask";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
                // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
            },

        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/registration",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Profile />,
            },
            {
                path: "addTask",
                element: <AddTask />,
            },
            {
                path: "upcomingTasks",
                element: <UpcomingTasks />,
            },
            {
                path: "updateTasks/:id",
                element: <UpdateTask />,
            },
        ],
    },
]);