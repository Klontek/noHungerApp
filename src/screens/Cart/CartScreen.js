import React, { useLayoutEffect, useEffect, useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons, AntDesign } from "@expo/vector-icons";
// import axios from "axios";
// import { UserType } from "../UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = (props) => {
  return (
    <View>
      {props.cartItems.map((x, index) => (
        <Text key={index}>{x.product.name}</Text>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({});

export default CartScreen;
