import {
  ADD_TO_CART,
  ADD_WISH_LIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "./ActionTypes";

const CartReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const deletedArray1 = initialState.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray1;

    default:
      return state;
  }
};

export default CartReducers;
