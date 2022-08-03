import { UserInfo } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, getSignInWithPopup } from "../services/firebase";

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        handleUser(user)
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  function handleUser(user: UserInfo) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error('Missing Information from Google Account.');
    }

    setUser({ 
      id: uid, 
      name: displayName, 
      avatar: photoURL 
    });
  }

  async function signInWithGoogle() {
    const result = await getSignInWithPopup();
    if (result.user) {
      handleUser(result.user);
    }
  }
  return (
    <AuthContext.Provider value={ { user, signInWithGoogle }}>
      { props.children }
    </AuthContext.Provider>
  )
}