import { SET_CURRENT_USER } from "../actions/Auth.action";
import isEmpty from "../../../assets/Common/is-Empty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}

// auth.reducer.js
// import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/Auth.action";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// const initialState = {
//   isAuthenticated: false,
//   token: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       return {
//         ...state,
//         isAuthenticated: !!action.payload,
//         user: action.payload,
//         token: action.payload,
//       };
//     case LOGOUT_USER:
//       return {
//         ...state,
//         isAuthenticated: false,
//         token: null,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
