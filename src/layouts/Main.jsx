import { Outlet } from "react-router-dom";
import Nav from "../components/shared/nav";
import { useEffect } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../reducers/userReducer";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        const fetchUser = async () => {
          const idTokenResult = await currentUser.getIdTokenResult();
          // console.log(currentUser);
          // console.log(idTokenResult.token);
          dispatch(
            userLoginSuccess({
              email: currentUser.email,
              token: idTokenResult.token,
            })
          );
        };
        fetchUser();
      }
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
