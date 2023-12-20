import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { withBadge } from "react-native-elements";
import { colors } from "../../global/styles";
import { useSelector } from "react-redux";

const cartData = useSelector((state) => state.CartReducers);
const BadgeIcon = withBadge({
  value: data.length,
  textStyle: { color: "white" },
})(Icon);

const CartIcon = () => {
  return (
    <>
      {cartData.length ? (
        <BadgeIcon
          type="material-community"
          name="basket"
          size={32}
          color={colors.CardBackground}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CartIcon;

const styles = StyleSheet.create({});
