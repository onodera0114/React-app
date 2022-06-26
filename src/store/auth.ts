import { atom } from "recoil";

type userInfo = {
  uid: string,
  email : string | null,
  displayName: string | null
}

export const signInUserState = atom<userInfo>({
  key: "auth/signIn",
  default: {
    uid: "",
    email: "",
    displayName: "",
  },
});
