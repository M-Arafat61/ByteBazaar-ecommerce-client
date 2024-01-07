import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase.config";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      url: `${import.meta.env.VITE_REGISTER_REDIRECT_URL}`,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
    toast.success(
      `Email is sent to ${email}. Please click the link to complete registration.`
    );
  };
  const isError = email === "";
  const registerForm = () => (
    <FormControl isInvalid={isError}>
      <FormLabel
        style={{
          fontSize: "34px",
          marginBottom: "20px",
        }}
      >
        Register
      </FormLabel>
      <Input
        type='email'
        style={{
          fontSize: "19px",
        }}
        height='52px'
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      {!isError ? (
        <FormHelperText className='mb-2'>
          Enter the email you would like to register.
        </FormHelperText>
      ) : (
        <FormErrorMessage className='mb-2'>Email is required.</FormErrorMessage>
      )}
      <Button
        style={{
          fontSize: "24px",
        }}
        type='submit'
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500'
      >
        Register
      </Button>
    </FormControl>
  );
  return (
    <div className='mx-auto w-3/4 mt-10 md:mt-36'>
      <form onSubmit={handleSubmit}>{registerForm()}</form>
    </div>
  );
};

export default Register;
