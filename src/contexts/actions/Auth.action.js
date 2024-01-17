import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseUrl from "../../../assets/Common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

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
//       if (data) {
//         const token = data.token;
//         AsyncStorage.setItem("jwt", token);
//         const decoded = jwt_decode(token);
//         dispatch(setCurrentUser(decoded, user));
//       } else {
//         LogoutUser(dispatch);
//       }
//     })
//     .catch((err) => {
//       Toast.show({
//         topOffset: 60,
//         type: success,
//         text1: "Signed In Successfull",
//         text2: "",
//       });

//       LogoutUser(dispatch);
//     });
// };

export const loginUser = (user, dispatch) => {
  return new Promise((resolve, reject) => {
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
        if (data) {
          console.log(data);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Signed In Success",
            text2: "",
          });
          const token = data.token;
          AsyncStorage.setItem("jwt", token);
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded, user));
          resolve(data); // Resolve with the data
        } else {
          LogoutUser(dispatch);
          reject(new Error("Invalid response from the server"));
        }
      })
      .catch((err) => {
        console.log(err.message);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Signed In Failed!",
          text2: "",
        });

        LogoutUser(dispatch);
        reject(err); // Reject with the error
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
