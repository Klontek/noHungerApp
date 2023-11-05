import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Profile from '../screens/Account/Profile';
import MyAccount from '../screens/Account/MyAccount';
import Notifications from '../screens/Account/Notification';
import MyOrders from '../screens/Account/MyOrders'


const Stack = createStackNavigator()

function AccountNavigator() {
 return (
  <Stack.Navigator>
   <Stack.Screen
    name='MyAccount'
    component={MyAccount}
    options={{
     title: 'MyAccount'
    }}
   />

   <Stack.Screen
    name='Profile'
    component={Profile}
    options={{
     title: 'Profile'
    }}
   />

   <Stack.Screen
    name='Myorders'
    component={MyOrders}
    options={{
     title: 'MyOrders'
    }}
   />

   <Stack.Screen
    name='Notifications'
    component={Notifications}
    options={{
     title: 'Notifications'
    }}
   />



  </Stack.Navigator>
 )
}

export default  AccountNavigator

