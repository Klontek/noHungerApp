import { combineReducers, createStore } from "redux";
import CartReducers from "./src/Redux/CartReducers";
import WishlistReducers from "./src/Redux/WishListReducers";

const routeReducer = combineReducers({ CartReducers, WishlistReducers });
export const store = createStore(routeReducer);
