import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./ActionTypes";

const CartReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const updatedCart = state.filter(
        (item, index) => index !== action.payload
      );
      return updatedCart;

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default CartReducers;
