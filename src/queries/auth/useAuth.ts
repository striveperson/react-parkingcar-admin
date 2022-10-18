import qs from "qs";
import { useMutation } from "react-query";

import { LoginData } from "../../components/auth/sign-in/SignIn";
import { ParkingCarResp } from "../../models/response/ParkingCarResp";
import { User } from "../../models/User";
import client from "../client";

export interface SignInResp extends ParkingCarResp {
  info: User;
}

const signIn = (account: LoginData) => client.post('/login', qs.stringify(account));
const signOut = () => client.delete('/logout');

export const useSignInMutation = () => useMutation(signIn);
export const useSignOutMutation = () => useMutation(signOut)


