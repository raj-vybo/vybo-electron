import React, { ReactElement, useEffect, useState } from 'react';
import { machineIdSync } from 'node-machine-id';
import MainConfig from 'config/main.config';
import penConfig from 'config/pen.config';
import FullPageSpinner from '../../shared/lib/FullPageSpinner/VyboLogoWaitingScreen';
import { LoginResponse } from '../login/login.types';
import { loginApi, logoutApi } from './accountApis';

type AuthInfo = {
  user: VyboUser | null;
  setUser: (user: VyboUser) => void;

  pendingUser: VyboUser | null;
  setPendingUser: (user: VyboUser | null) => void;

  logout: () => Promise<void>;
};
const AuthContext = React.createContext({} as AuthInfo);

function AuthProvider({ children }: { children: ReactElement }) {
  const [fetchingUser, setFetchingUser] = useState(true);

  const [user, setUser] = useState<VyboUser | null>(null);
  const [pendingUser, setPendingUser] = useState<VyboUser | null>(null);

  const logout = () => {
    return logoutApi({ machineId: machineIdSync(true) }).then(() => {
      setUser(null);
      setTimeout(() => {
        MainConfig.reset();
        penConfig.reset();
      }, 1);
    });
  };

  useEffect(() => {
    if (!user) {
      loginApi({ machineId: machineIdSync(true) })
        .then((res: LoginResponse) => {
          if (res.success) {
            setUser({
              name: res.data.name,
              email: res.data.email,
              token: res.data.jwt,
              loginDone: res.data.loginDone || false,
            });
          }
          setTimeout(() => setFetchingUser(false), 4500);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => setFetchingUser(false), 4500);
        });
    }
  }, []);

  if (fetchingUser) {
    return <FullPageSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
        setUser,
        pendingUser,
        setPendingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
