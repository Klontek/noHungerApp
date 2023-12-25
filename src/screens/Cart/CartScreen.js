import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../global/styles";
import { clearCart, removeFromCart } from "../../Redux/Actions";
import CartItem from "./CartItem";

import { SwipeListView } from "react-native-swipe-list-view";
import EasyButton from "../../Shared/StyledComponent";
import AuthGlobal from "../../contexts/store/AuthGlobal";

const { height, width } = Dimensions.get("window");

const CartScreen = ({ navigation }) => {
  const context = useContext(AuthGlobal);
  const [cartList, setCartList] = useState([]);
  // const [quantity, setQuantity] = useState(car);
  const cartData = useSelector((state) => state.CartReducers);
  // setCartList(cartData);
  const dispatch = useDispatch();

  let total = 0;
  cartData.forEach((cart) => {
    return (total += cart.price);
  });
  return (
    <>
      {cartData.length ? (
        <View style={{ flex: 1 }}>
          <SwipeListView
            keyExtractor={(item, index) => index.toString()}
            data={cartData}
            renderItem={(data) => (
              <CartItem
                item={data.item}
                // onRemoveItem={() => dispatch(removeFromCart(index))}
              />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity style={styles.hiddenButton}>
                  <Icon name="delete" type="material" size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />

          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.price}>Total: #{total}</Text>
            </View>

            <View>
              <EasyButton
                medium
                danger
                buttonStyle={{ backgroundColor: colors.buttons }}
                onPress={() => dispatch(clearCart())}
              >
                <Text style={{ color: "white" }}>Clear</Text>
              </EasyButton>
            </View>
            <View>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  medium
                  primary
                  buttonStyle={{ backgroundColor: colors.buttons }}
                  onPress={() => navigation.navigate("Checkout")}
                >
                  <Text style={{ color: "white" }}>Checkout</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  medium
                  secondary
                  buttonStyle={{ backgroundColor: colors.buttons }}
                  onPress={() => navigation.navigate("SignInScreen")}
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </EasyButton>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Looks like your basket is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: colors.CardBackground,
    elevation: 20,
  },
  price: {
    margin: 10,
    fontSize: 18,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: 100,
  },
});

export default CartScreen;
