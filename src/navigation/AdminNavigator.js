import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import Orders from '../screens/Admin/Orders';
import ProductForm from '../screens/Admin/ProductForm';
import Products from '../screens/Admin/Products';
import Categories from '../screens/Admin/Categories';
import SearchBar from '../components/SearchBar/SearchBar';


const Stack = createStackNavigator()

function MyStack() {
 return (
  <Stack.Navigator>
   <Stack.Screen
    name='Products'
    component={Products}
    options={{
     title: 'Products'
    }}
   />

   <Stack.Screen name='Categories' component={Categories}/>
   <Stack.Screen name='Orders' component={Orders}/>
   <Stack.Screen name='ProductForm' component={ ProductForm}/>
   <Stack.Screen name='SearchBar' component={ SearchBar }/>
  </Stack.Navigator>
 )
}

export default function AdminNavigator() {
 return <MyStack/>
}