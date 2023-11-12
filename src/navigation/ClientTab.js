import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Icon} from "react-native-elements";
// import {} from "react-native"
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../global/styles';
import SearchScreen from '../screens/ShopSearchScreen';
// import MyOrdersScreen from '../screens/MyOrdersScreen';
// import MyAccountScreen from '../screens/MyAccountScreen';
import ClientStack from './ClientStack';
import AdminNavigator from './AdminNavigator';
import MyAccount from '../screens/Account/MyAccount';
import AccountNavigator from './AccountNavigation';
// import MyOrders from '../screens/Account/MyOrders';

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
    name="Account"
    component={AccountNavigator}
    options={
     {
      tabBarLabel:"Account",
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
    name="Dashboard"
    component={AdminNavigator}
    options={
     {
      tabBarLabel:"Admin",
      tabBarIcon: (({color, size}) => {
        return(
       <Icon
         name='settings'
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
    name="Search"
    component={Search}
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

    {/* <ClientTabs.Screen
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
    /> */}
{/* 
    <ClientTabs.Screen
    name="Myorders"
    component={MyOrders}
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
    /> */}


   </ClientTabs.Navigator>
  )
}
