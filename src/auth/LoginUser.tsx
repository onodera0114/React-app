import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "@firebase/auth";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { auth } from "../firebase";
import { signInUserState } from "../store/auth";

export const signIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((success) => {
      alert("ログインしました。");
    })
    .catch((error) => {
      alert("サインイン認証に失敗しました。");
    });
};

export const signOutUser = async () => {
  signOut(auth)
    .then((success) => {
      alert("サインアウトしました。");
    })
    .catch((error) => {
      alert("サインアウトに失敗しました。");
    });
};

export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setSignInUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName
        });
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
