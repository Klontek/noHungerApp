import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../screens/Admin/Orders";
import ProductForm from "../screens/Admin/ProductForm";
import Products from "../screens/Admin/Products";
import Categories from "../screens/Admin/Categories";
import SearchBar from "../components/SearchBar/SearchBar";
import Dashboard from "../screens/Admin/AdminScreen";
import AdminProductDetail from "../screens/Admin/AdminProductDetail";
// import Profile from "../screens/Account/Profile"
// import MyOrders from "../screens/Account/Profile"
// import Notifications from "../screens/Account/Profile"
// import MyAccount from '../screens/Account/MyAccount';
// import Account from "../screens/Account/Profile"

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Admin" component={Dashboard} />

      <Stack.Screen name="Products" component={Products} />

      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
      <Stack.Screen name="SearchBar" component={SearchBar} />
      <Stack.Screen
        name="AdminProductDetail"
        component={AdminProductDetail}
        options={() => ({
          headerShown: false,
        })}
      />

      {/* <Stack.Screen name='profile' component={ Profile}/>
   <Stack.Screen name='myorders' component={ MyOrders }/>
   <Stack.Screen name='notifications' component={ Notifications }/>
   <Stack.Screen name='account' component={ MyAccount }/> */}
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
