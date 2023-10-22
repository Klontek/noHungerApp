import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack"; 
import ShopMapScreen from "../screens/ShopMapScreen";
import DrawerNavigator from "./DrawerNavigator";


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