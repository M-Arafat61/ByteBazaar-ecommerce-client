import { Input } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { userLoadingStart, userLoadingStop } from "../../reducers/userReducer";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmission = e => {
    userLoadingStart();
    e.preventDefault();
    const config = {
      url: `${import.meta.env.VITE_FORGOT_PASS_REDIRECT}`,
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        userLoadingStop();
        toast.success("Please check your inbox to update password.");
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const { loading } = useSelector(state => state.userinfo);
  //   console.log(loading);
  return (
    <div className='flex flex-col space-y-5 mt-10 md:mt-36 shadow-2xl w-1/2 mx-auto p-5'>
      <div className='space-y-4'>
        {loading ? (
          <h2 className='text-2xl font-semibold text-red-600'>
            Password reset email on the way...
          </h2>
        ) : (
          <h2 className='text-2xl font-semibold'>Enter Your Email</h2>
        )}
        <hr />
        <p>Please enter your email address to receive password reset link.</p>
      </div>
      <form className='space-y-5' onSubmit={handleEmailSubmission}>
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
        <hr />
        <div className='flex justify-end gap-x-5'>
          <Link to='/login'>
            <button
              type='button'
              className='bg-neutral-300/85 px-5 rounded-lg py-2 text-gray-600 font-semibold'
            >
              Cancel
            </button>
          </Link>
          <button
            className='hover:bg-emerald-600/85 px-5 rounded-lg py-2 font-semibold text-white bg-emerald-500'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
