import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackFunction } from "./authNavigators";
import { AppStackFunction } from "./appStack";
import AuthGlobal from "../contexts/store/AuthGlobal";
// import AuthContext from "../contexts/store/Auth";

export default function RootNavigator() {
  const { stateUser } = useContext(AuthGlobal);
  return (
    <NavigationContainer>
      {!stateUser.isAuthenticated ? (
        <AuthStackFunction />
      ) : (
        <AppStackFunction />
      )}
    </NavigationContainer>
  );
}

// import React, { useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { AuthStackFunction } from "./authNavigators";
// import { AppStackFunction } from "./appStack";
// // import {SignInContext} from "../contexts/authContext"
// import Auth from "../contexts/store/Auth";

// export default function RootNavigator() {
//   const { stateUser } = useContext(Auth);
//   return (

//     <NavigationContainer>
//       {Auth.userToken !== "signed-in" ? (
//         <AuthStackFunction />
//       ) : (
//         <AppStackFunction />
//       )}
//     </NavigationContainer>
//   );
// }
