import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack"; 
import ShopMapScreen from "../screens/ShopMapScreen";
import DrawerNavigator from "./DrawerNavigator";
import { CartScreen } from "../screens/Cart/CartScreen";
import { AdminScreen } from "../screens/Admin/AdminScreen";
import { SingleProduct } from "../screens/Products/SIngleProduct";
import CategoriesRestaurantScreen from "../screens/CategoriesRestaurantScreen"


const App= createStackNavigator();

export const AppStackFunction = () => {
  return (
   <App.Navigator>
       <App.Screen
      name="App"
      component={DrawerNavigator}
      options={{
        headerShown: false,
        ...TransitionPresets.RevealFromBottomAndroid
      }}
      />

    <App.Screen
     name="CartScreen"
     component={CartScreen}
     options={() =>({
      headerShown: false,
      ...TransitionPresets.RevealFromBottomAndroid
     })}
    />

    <App.Screen
     name="Admin"
     component={AdminScreen}
     options={() =>({
      headerShown: false,
      ...TransitionPresets.RevealFromBottomAndroid
     })}
    />

    <App.Screen
     name="SingleProduct"
     component={SingleProduct}
     options={() =>({
      headerShown: false,
      ...TransitionPresets.RevealFromBottomAndroid
     })}
    />

    <App.Screen
     name="CategoriesRestaurantScreen"
     component={CategoriesRestaurantScreen}
     options={() =>({
      headerShown: false,
      ...TransitionPresets.RevealFromBottomAndroid
     })}
    />

      <App.Screen
      name="ShopMapScreen"
      component={ShopMapScreen}
      options={{
        headerShown: false,
        ...TransitionPresets.RevealFromBottomAndroid
      }}
      /> 
   </App.Navigator>
  )
}