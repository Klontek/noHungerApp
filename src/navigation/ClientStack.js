import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react';
import { createStackNavigator, transitionPresets } from '@react-navigation/stack';
import SearchScreen from '../screens/ShopSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ShopHomeScreen from '../screens/ShopHomeScreen';
import ShopItemsDetailScreen from '../screens/ShopItemsDetailScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PreferenceScreen from '../screens/PreferenceScreen';
// import { useIsFocused } from '@react-navigation/native';




const ClientSearch = createStackNavigator()


const ClientStack = ({navigation, route}) => {

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if(routeName === "ShopHomeScreen" || "ShopItemDetailScreen") {
      navigation.setOptions({tabBarVisible: false})
    }else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
   <ClientSearch.Navigator>
    <ClientSearch.Screen
     name="SearchScreen"
     component={SearchScreen}
     options={() =>({
      headerShown: false
     })}
    />

    <ClientSearch.Screen
     name="SearchResultScreen"
     component={SearchResultScreen}
     options={() =>({
      headerShown: false
     })}
    />

    <ClientSearch.Screen
     name="ShopHomeScreen"
     component={ShopHomeScreen}
     options={() =>({
      headerShown: false
     })}
    />

    <ClientSearch.Screen
     name="ShopItemDetailScreen"
     component={ShopItemsDetailScreen}
     options={() =>({
      headerShown: false
     })}
    />

    <ClientSearch.Screen
     name="PreferenceScreen"
     component={PreferenceScreen}
     options={() =>({
      headerShown: false
     })}
    />

   </ClientSearch.Navigator>
  )
}

export default ClientStack;

const styles = StyleSheet.create({})