import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Main from "../layouts/Main";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import Cart from "../pages/cart/Cart";
import Shop from "../pages/shop/Shop";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AuthGuard from "./AuthGuard";
import History from "../pages/user/History";
import PrivateRoute from "./PrivateRoute";
// import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "user/history",
        element: (
          <PrivateRoute>
            <History />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
      {
        path: "register/complete",
        element: (
          <AuthGuard>
            <RegisterComplete />
          </AuthGuard>
        ),
      },
      {
        path: "forgot/password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
