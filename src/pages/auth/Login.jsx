import { useState } from "react";
import { FormControl, Text, Input, Button, Box } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { auth, googleProvider } from "../../firebase.config";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { EmailIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { userLoginFailure, userLoginSuccess } from "../../reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const roleBasedUser = res => {
  //   if (res.data.role === "admin") {
  //     console.log('navigate("/admin/dashboard");');
  //     navigate("/admin/dashboard");
  //   } else {
  //     console.log('navigate("/user/history");');
  //     navigate("/user/history");
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // dispatch(userLoadingStart());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();
      // console.log(idTokenResult.token);
      const idToken = idTokenResult.token;
      createOrUpdateUser(idToken)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setLoading(false);
            dispatch(
              userLoginSuccess({
                name: res?.data?.name,
                username: res.data.username,
                email: res.data.email,
                userId: res.data._id,
                role: res.data.role,
                token: idTokenResult.token,
              })
            );
          }
        })
        .catch(error => console.log(error));

      // navigate("/");
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      dispatch(userLoginFailure(error.message));
    }
  };
  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async result => {
        const user = result.user;
        const idTokenResult = await user.getIdTokenResult();
        const idToken = idTokenResult.token;
        // console.log(user);
        // console.log(idToken);
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
            // roleBasedUser(res);
          })
          .catch(error => console.log(error));
        navigate("/");
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(error => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const loginForm = () => (
    <FormControl className='space-y-5'>
      <Text fontSize={"5xl"}>Login</Text>
      <Box className='space-y-2'>
        <Input
          type='email'
          id='email'
          style={{
            fontSize: "19px",
          }}
          height='52px'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          placeholder='Email'
          isRequired
        />

        <Input
          type='password'
          id='password'
          style={{
            fontSize: "19px",
          }}
          height='52px'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          isRequired
        />
        {loading ? (
          <Button
            className='w-full'
            leftIcon={<EmailIcon />}
            border='2px'
            borderColor='green.500'
            variant='solid'
            type='submit'
            isDisabled={!email || password.length < 6}
          >
            Login using registered email/password
          </Button>
        ) : (
          <Button
            className='w-full'
            leftIcon={<ImSpinner6 />}
            border='2px'
            borderColor='green.500'
            variant='solid'
            type='submit'
            isDisabled={!email || password.length < 6}
          >
            Login using registered email/password
          </Button>
        )}
      </Box>
    </FormControl>
  );

  return (
    <div className='mx-auto w-3/4 mt-10 md:mt-36 space-y-5'>
      <form onSubmit={handleSubmit}>{loginForm()}</form>
      <Link to='/forgot/password'>
        <button className='text-[#1877f2] hover:underline'>
          Forgotten password?
        </button>
      </Link>
      <Button
        style={{
          fontSize: "18px",
        }}
        size='md'
        height='48px'
        width='100%'
        colorScheme='teal'
        leftIcon={<FaGoogle />}
        onClick={handleGoogleLogin}
      >
        Login with google
      </Button>
    </div>
  );
};

export default Login;
