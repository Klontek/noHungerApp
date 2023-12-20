import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import ShopMapScreen from "../screens/ShopMapScreen";
import DrawerNavigator from "./DrawerNavigator";
import CartScreen from "../screens/Cart/CartScreen";
// import { AdminScreen } from "../screens/Admin/AdminScreen";
import { SingleProduct } from "../screens/Products/SIngleProduct";
import CategoriesRestaurantScreen from "../screens/RestaurantCategory/CategoriesRestaurantScreen";
import ShopHomeScreen from "../screens/ShopHomeScreen";
import RegisterBusinessScreen from "../screens/BusinessScreen/RegisterBusinessScreen";
import { BannerSingleProduct } from "../screens/Products/BannerSingleProduct";
import ProductDetail from "../screens/Products/ProductDetail";
import CheckoutNavigator from "./CheckoutNavigator";
// import AdminNavigator from "./AdminNavigator";
// import CategoriesRestaurantScreen from "../screens/CategoriesRestaurantScreen"

const App = createStackNavigator();

export const AppStackFunction = () => {
  return (
    <App.Navigator>
      <App.Screen
        name="App"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <App.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({
          headerShown: true,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={() => ({
          headerShown: true,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="ShopHomeScreen"
        component={ShopHomeScreen}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="RegisterBusinessScreen"
        component={RegisterBusinessScreen}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="BannerSingleProduct"
        component={BannerSingleProduct}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="CategoriesRestaurantScreen"
        component={CategoriesRestaurantScreen}
        options={() => ({
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />

      <App.Screen
        name="ShopMapScreen"
        component={ShopMapScreen}
        options={{
          headerShown: true,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </App.Navigator>
  );
};
