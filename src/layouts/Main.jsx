import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../reducers/userReducer";
import { dbCurrentUser } from "../api";
import Nav from "../components/shared/Nav";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        const fetchUser = async () => {
          const idTokenResult = await currentUser.getIdTokenResult();
          const idToken = idTokenResult.token;

          try {
            const res = await dbCurrentUser(idToken);
            dispatch(
              userLoginSuccess({
                name: res.data.name,
                username: res.data.username,
                email: res.data.email,
                userId: res.data._id,
                role: res.data.role,
                token: idToken,
              })
            );
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
