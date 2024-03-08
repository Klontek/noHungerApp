import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseUrl from "../../../assets/Common/baseUrl";
import { useNavigation } from "@react-navigation/native";

// auth.action.js
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// const navigation = useNavigation();

export const loginUser = (user, dispatch) => {
  fetch(`${baseUrl}users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const token = data.user.token; // Assuming the token is directly returned in the response
        AsyncStorage.setItem("jwt", token)
          .then(() => console.log("Token stored successfully"))
          .catch((storageErr) =>
            console.log("Error storing token:", storageErr)
          );
        const decoded = jwt_decode(token);
        console.log("Decoded Token:", decoded);
        dispatch(setCurrentUser(decoded, user));
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: `Invalid email or password`,
          text2: "",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `An error occurred. Please try again later.`,
        text2: "",
      });
    });
};

export const UserProfile = (user, id) => {
  fetch(`${baseUrl}users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const LogoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};

// export const loginUser = (user, dispatch) => {
//   fetch(`${baseUrl}users/login`, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log(data);
//       if (data.success) {
//         const token = data.user.token; // Extract token from user object
//         AsyncStorage.setItem("jwt", token)
//           .then(() => console.log("Token stored successfully"))
//           .catch((storageErr) =>
//             console.log("Error storing token:", storageErr)
//           );
//         const decoded = jwt_decode(token);
//         console.log("Decoded Token:", decoded);
//         dispatch(setCurrentUser(decoded, user));
//       } else {
//         LogoutUser(dispatch);
//       }
//     })
//     .catch((err) => {
//       console.log(err);

//       LogoutUser(dispatch);
//     });
// };

// export const LOGOUT_USER = "LOGOUT_USER";

// export const loginUser = (user, dispatch) => {
//   fetch(`${baseUrl}users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.token) {
//         // Store the token in AsyncStorage
//         AsyncStorage.setItem("token", data.token)
//           .then(() => console.log("Token stored successfully"))
//           .catch((storageErr) =>
//             console.log("Error storing token:", storageErr)
//           );

//         // Dispatch action to set the current user
//         dispatch(setCurrentUser(data.token, user));
//       } else {
//         // Handle login failure, you may want to show an error
//         logoutUser(dispatch);
//       }
//     })
//     .catch((error) => {
//       console.error("Error logging in:", error);
//       // Handle error, you may want to show an error message
//       Toast.show({
//         topOffset: 60,
//         type: "error",
//         text1: "Error Logging User!",
//         text2: "",
//       });
//     });
// };

// export const UserProfile = (user, id) => {
//   fetch(`${baseUrl}users/${id}`, {
//     method: "GET",
//     body: JSON.stringify(user),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };
// export const setCurrentUser = (token, user) => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: token,
//     userProfile: user,
//   };
// };

// export const logoutUser = (dispatch) => {
//   // Clear the token from AsyncStorage and dispatch logout action
//   AsyncStorage.removeItem("token");
//   dispatch({ type: LOGOUT_USER });
// };

// export const loginUser = (user, dispatch) => {
//   return new Promise((resolve, reject) => {
//     fetch(`${baseUrl}users/login`, {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           // console.log(data);
//           Toast.show({
//             topOffset: 60,
//             type: "success",
//             text1: "Signed In Success",
//             text2: "",
//           });
//           const token = data.token;
//           AsyncStorage.setItem("jwt", token);
//           const decoded = jwt_decode(token);
//           dispatch(setCurrentUser(decoded, user));
//           resolve(data); // Resolve with the data
//         } else {
//           LogoutUser(dispatch);
//           reject(new Error("Invalid response from the server"));
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//         Toast.show({
//           topOffset: 60,
//           type: "error",
//           text1: "Signed In Failed!",
//           text2: `error message:`,
//         });

//         LogoutUser(dispatch);
//         reject(err); // Reject with the error
//       });
//   });
// };

// export const loginUser = (user, dispatch) => {
//   return new Promise((resolve, reject) => {
//     fetch(`${baseUrl}users/login`, {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           console.log(data);
//           Toast.show({
//             topOffset: 60,
//             type: "success",
//             text1: "Signed In Success",
//             text2: "",
//           });
//           const token = data.token;
//           AsyncStorage.setItem("jwt", token);
//           const decoded = jwt_decode(token);
//           dispatch(setCurrentUser(decoded, user));
//           resolve(data); // Resolve with the data
//         } else {
//           LogoutUser(dispatch);
//           reject(new Error("Invalid response from the server"));
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//         Toast.show({
//           topOffset: 60,
//           type: "error",
//           text1: "Signed In Failed!",
//           text2: `error message: ${err.message}`,
//         });

//         LogoutUser(dispatch);
//         reject(err); // Reject with the error
//       });
//   });
// };
