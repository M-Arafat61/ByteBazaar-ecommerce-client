/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FormControl, Input, Button, Text } from "@chakra-ui/react";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../api";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../reducers/userReducer";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      //   console.log(result);

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        // get user token
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        const idToken = idTokenResult.token;
        // console.log("User", user, idTokenResult);
        // redux store
        createOrUpdateUser(idToken)
          .then(res => {
            console.log(res);
            // updating redux store with user info
            dispatch(
              userLoginSuccess({
                name: res.data.name,
                username: res.data.username,
                email: res.data.email,
                userId: res.data._id,
                role: res.data.role,
                token: idTokenResult.token,
              })
            );
          })
          .catch(error => console.log(error));
        navigate("/");
        toast.success("Registration successful.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegisterForm = () => (
    <FormControl>
      <Text
        style={{
          fontSize: "34px",
          marginBottom: "20px",
        }}
      >
        Complete Registration
      </Text>
      <Input
        type='email'
        id='email-input'
        style={{
          fontSize: "19px",
        }}
        height='52px'
        value={email ? email : ""}
        disabled
      />
      <Input
        className='my-5'
        type='password'
        id='password-input'
        placeholder='Password'
        style={{
          fontSize: "19px",
        }}
        height='52px'
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoFocus
      />

      <Button
        style={{
          fontSize: "18px",
        }}
        type='submit'
        size='md'
        height='48px'
        width='220px'
        border='2px'
        borderColor='green.500'
      >
        Complete Registration
      </Button>
    </FormControl>
  );
  return (
    <div className='mx-auto w-3/4 mt-10 md:mt-36'>
      <form onSubmit={handleSubmit}>{completeRegisterForm()}</form>
    </div>
  );
};

export default RegisterComplete;
