import { ADD_WISH_LIST, REMOVE_FROM_WISHLIST } from "./ActionTypes";

const WishlistReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_WISH_LIST:
      return [...state, action.payload];

    case REMOVE_FROM_WISHLIST:
      const deletedArray2 = initialState.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray2;

    default:
      return state;
  }
};

export default WishlistReducers;
