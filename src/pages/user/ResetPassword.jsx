import React from "react";
import { FormControl, Input, Button, Text } from "@chakra-ui/react";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handleChangePassword = async e => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password changed successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='w-3/4 mx-auto'>
      <form onSubmit={handleChangePassword}>
        <FormControl>
          <Text style={{ fontSize: "34px", marginBottom: "20px" }}>
            Change Password
          </Text>
          <Input
            type='password'
            id='current-password-input'
            placeholder='Current Password'
            style={{ fontSize: "19px" }}
            height='52px'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            autoFocus
          />
          <Input
            className='my-5'
            type='password'
            id='new-password-input'
            placeholder='New Password'
            style={{ fontSize: "19px" }}
            height='52px'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          <Button
            style={{ fontSize: "18px" }}
            type='submit'
            size='md'
            height='48px'
            width='220px'
            border='2px'
            borderColor='green.500'
            isDisabled={currentPassword.length < 6}
          >
            Change Password
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default ResetPassword;
