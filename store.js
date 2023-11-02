import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./src/Redux/Reducers/CartReducer";

export default configureStore({
    reducer:{
        cart:CartReducer
    }
})