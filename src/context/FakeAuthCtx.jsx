import { createContext, useContext, useReducer } from "react";

const AuthCtx = createContext();

const USER = {
  username: "user1",
  password: "12345678",
  email: "user@user.com",
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: USER };
    case "logout":
      return { ...initialState };
    default:
      throw new Error(`${action.type} action not suported`);
  }
}

function AuthContextProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === USER.email && password === USER.password) {
      dispatch({ type: "login" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthCtx.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthCtx.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthCtx);
  if (ctx === undefined) throw new Error("Cannot use the context outside is provider");
  return ctx;
}

export { AuthContextProvider, useAuth };
