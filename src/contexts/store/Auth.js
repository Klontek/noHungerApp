// import React, { useReducer, useEffect, useState, useContext } from "react";
// import jwt_decode from "jwt-decode";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import AuthReducer from "../reducers/Auth.reducer";
// import { setCurrentUser } from "../actions/Auth.action";
// import AuthGlobal from "./AuthGlobal";

// const Auth = (props) => {
//   const [stateUser, dispatch] = useReducer(AuthReducer, {
//     isAuthenticated: null,
//     user: {},
//   });
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const token = await AsyncStorage.getItem("jwt");
//         console.log({ msg: "token from Auth", token: token });
//         if (token) {
//           const decoded = jwt_decode(token);
//           dispatch(setCurrentUser(decoded));
//         }
//       } catch (error) {
//         console.error("Error loading user:", error);
//       }
//     };

//     loadUser();
//   }, []);

//   // useEffect(() => {
//   //   const loadUser = async () => {
//   //     try {
//   //       const token = await AsyncStorage.getItem("jwt");

//   //       if (token) {
//   //         const decoded = jwt_decode(token);
//   //         dispatch(setCurrentUser(decoded));
//   //         return token; // Add this line to return the token
//   //       } else {
//   //         return null; // Return null if token is not found
//   //       }
//   //     } catch (error) {
//   //       console.error("Error loading user:", error);
//   //       return null; // Return null in case of an error
//   //     }
//   //   };

//   //   loadUser().then((token) => {
//   //     // Trigger a re-render of the component with the retrieved token
//   //     setToken(token);
//   //   });
//   // }, []);

//   return (
//     <AuthGlobal.Provider
//       value={{
//         stateUser,
//         dispatch,
//       }}
//     >
//       {props.children}
//     </AuthGlobal.Provider>
//   );
// };

// export default Auth;

import React, { useReducer, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.action";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }
    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;

// auth.store.js
// import React, { createContext, useReducer, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import authReducer from "../reducers/Auth.reducer";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     isAuthenticated: false,
//     token: null,
//   });

//   useEffect(() => {
//     // Check if the user is already authenticated by checking AsyncStorage
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         dispatch({ type: SET_CURRENT_USER, payload: token });
//       }
//     };

//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
