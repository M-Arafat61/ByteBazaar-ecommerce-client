import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Main from "./layouts/Main";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "register/complete",
        element: <RegisterComplete />,
      },
    ],
  },
]);

export default router;
