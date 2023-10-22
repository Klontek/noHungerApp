import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack"; // Import from @react-navigation/stack

import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
// import RootClientTabs from "./ClientTab";

import SignUpScreen from "../screens/authScreens/SignUpScreen";


const AuthStack = createStackNavigator();

export const AuthStackFunction = () =>{
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="SignInWelcomeScreen"
        component={SignInWelcomeScreen}
        options={{
          headerShown: false, // Use headerShown instead of headerOptions
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <AuthStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false, // Use headerShown instead of headerOptions
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false, // Use headerShown instead of headerOptions
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

    </AuthStack.Navigator>
  );
}
