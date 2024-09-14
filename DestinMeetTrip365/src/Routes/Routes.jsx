import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import DashboardGuide from "../pages/Dashboard/DashboardGuide";
import ListTours from "../pages/ListTours/ListTours";
import Login from "../pages/SignIn/Login";
import Register from "../pages/SignUp/Register";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/SignUp",
        element: <Register />,
    },
    {
        path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardGuide />,
      },
        {
            path: "tours",
            element: <ListTours />,
        },
        // {
        //     path: "tours/:id",
        //     element: <Tour />,
        // },
        // {
        //     path:"Booking",
        //     element: <Booking />
        // }
    ],
},

])

export default AppRoutes;