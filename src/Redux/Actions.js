import {
  ADD_TO_CART,
  ADD_WISH_LIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "./ActionTypes";

export const addItemToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});

export const addToWishList = (data) => ({
  type: ADD_WISH_LIST,
  payload: data,
});

export const removeFromWishlist = (index) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: index,
});
