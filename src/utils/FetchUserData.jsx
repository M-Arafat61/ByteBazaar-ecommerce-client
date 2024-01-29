/* eslint-disable react/prop-types */
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase.config";
import { dbCurrentUser } from "../api/auth";
import {
  userLoadingStart,
  userLoadingStop,
  userLoginSuccess,
  userLogout,
} from "../reducers/userReducer";
import { Icon } from "@chakra-ui/react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const FetchUserData = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.user.userinfo);
  // console.log(loading);

  useEffect(() => {
    dispatch(userLoadingStart());
    const unsubscribeAuthState = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        const unsubscribeTokenChanged = onIdTokenChanged(
          auth,
          async userWithToken => {
            if (!userWithToken) {
              dispatch(userLogout());
              console.log("User logged out");
              navigate("/login");
            }
          }
        );
        const idTokenResult = await currentUser.getIdTokenResult();
        const idToken = idTokenResult.token;

        try {
          const res = await dbCurrentUser(idToken);
          dispatch(
            userLoginSuccess({
              name: res?.data?.name,
              username: res.data.username,
              email: res.data.email,
              userId: res.data._id,
              role: res.data.role,
              token: idToken,
            })
          );
        } catch (error) {
          console.log(error);
        }

        return () => unsubscribeTokenChanged();
      } else {
        dispatch(userLoadingStop());
      }
    });

    return () => unsubscribeAuthState();
  }, [dispatch, navigate]);
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Icon as={ImSpinner9} className='text-3xl animate-spin' />
      </div>
    );
  }

  return children;
};

export default FetchUserData;
