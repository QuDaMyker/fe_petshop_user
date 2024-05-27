import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";
import { toast } from "react-toastify";


const userEndpoints = {
  signin: "Authenticate/login",
  signup: "Authenticate/register",
  verify: ({ token }) => `Authenticate/verify/${token}`,
  changePassword: "Authenticate/change-password",
  forgotPassword: ({ email }) => `Authenticate/forgot-password?email=${email}`,
  resetPassword: "Authenticate/reset-password",
  getInfo: "Authenticate/info",
  updateInfo: "Authenticate/update-info-user"
};

const userApi = {
  signin: async ({ email, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signin,
        { email, password }
      );
      return { response };
    } catch (err) {      console.log(err);
      return { err }; }
  },
  signup: async ({ username, email, password, phoneNumber, firstName, lastName }) => {
    try {
      const name = username;
      console.log(name)
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, email, password, phoneNumber, firstName, lastName }
      );
      return { response };
    } catch (err) { 
      console.log(err);
      return { err }; }
  },
  verify: async ({ token }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.verify({ token })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  forgotPassword: async ({ email }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.forgotPassword({ email })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  resetPassword: async ({ token, newPassword, confirmNewPassword }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.resetPassword,
        { token, newPassword, confirmNewPassword }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  changePassword: async ({ CurrentPassword , NewPassword, ConfirmNewPassword }) => {
    console.log(CurrentPassword, NewPassword, ConfirmNewPassword);
    try {
      const response = await privateClient.post(
        userEndpoints.changePassword,
        {ConfirmNewPassword,CurrentPassword, NewPassword }
      );
      return { response };
    } catch (err) {
      console.log("Error message:", err);
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) { return { err }; }
  },
  updateUser: async ({UserName,FirstName,LastName,PhoneNumber}) => {
    try {
      const response = await privateClient.put(userEndpoints.updateInfo,{UserName,FirstName,LastName,PhoneNumber});
      return { response };
    } catch (err) { 
      console.log("Error message:", err);
      return { err }; }
  }
};

export default userApi;