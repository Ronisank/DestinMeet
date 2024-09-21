import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import Booking from "../pages/Booking/Booking";
import DashboardGuide from "../pages/Dashboard/DashboardGuide";
import ListTours from "../pages/ListTours/ListTours";
import Login from "../pages/SignIn/Login";
import Register from "../pages/SignUp/Register";
import TourDetail from "../pages/TourDetail/TourDetail";
import TourRegistration from "../pages/TourRegistration/TourRegistration";
import TourReviews from "../pages/TourReviews/TourReviews";

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
    path: "/dashboard-guide",
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
      {
          path: "tour-registration",
          element: <TourRegistration />,
      },
      {
          path:"booking",
          element: <Booking />
      },
      {
        path: "tourDetail/:id",
        element: <TourDetail />,
      },
      {
        path: "tourReviews/:id",
        element: <TourReviews />,
      }
    ],
  },
]);

export default AppRoutes;
