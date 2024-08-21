import React, { Dispatch, SetStateAction, useState } from 'react';
import { useStorageState } from './hooks/useStorageState';

const AuthContext = React.createContext<{
  signIn: (token:string) => void;
  setFile: Dispatch<SetStateAction<File|undefined>>;
  file:File|undefined;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (token: string) => {},
  setFile: (file) => {},
  signOut: () => null,
  session: null,
  isLoading: false,
  file: new File(["foo"], "foo.txt", {
    type: "text/plain",
  })
  ,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session'); 

  const [file,setFile] = useState<File>()

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string | null) => {
          // Perform sign-in logic here
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        setFile,

        file
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
