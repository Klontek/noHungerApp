import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Icon} from "react-native-elements";
// import {} from "react-native"
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../global/styles';
import SearchScreen from '../screens/SearchScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import ClientStack from './ClientStack';

const ClientTabs = createBottomTabNavigator()

export default function RootClientTabs() {
  return (
   <ClientTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.buttons,
        keyboardHidesTabBar: true,
        showLabel: false,
      }}
   >

    <ClientTabs.Screen
    name="HomeScreen"
    component={HomeScreen}
    options={
     {
      tabBarLabel:"Home",
      tabBarIcon: (({color, size}) => {
        return(
       <Icon
         name='home'
         type='material'
         color={color}
         size={size}
       />
        )

      }
      )
     }
    }
    />

    <ClientTabs.Screen
    name="MyAccountScreen"
    component={MyAccountScreen}
    options={
     {
      tabBarLabel:"My Account",
      tabBarIcon: (({color, size}) => {
        return(
       <Icon
         name='person'
         type='material'
         color={color}
         size={size}
       />
        )

      }
      )
     }
    }
    />

    <ClientTabs.Screen
    name="ClientStack"
    component={ClientStack}
    options={
     {
      tabBarLabel:"Search",
      tabBarIcon: (({color, size}) => {
        return(
       <Icon
         name='search'
         type='material'
         color={color}
         size={size}
       />
        )

      }
      )
     }
    }
    />

    <ClientTabs.Screen
    name="MyOrdersScreen"
    component={MyOrdersScreen}
    options={
     {
      tabBarLabel:"My Orders",
      tabBarIcon: (({color, size}) => {
        return(
       <Icon
         name='view-list'
         type='material'
         color={color}
         size={size}
       />
        )

      }
      )
     }
    }
    />


   </ClientTabs.Navigator>
  )
}
