import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Payment from "../screens/Cart/Checkout/Payment";
import Confirm from "../screens/Cart/Checkout/Confirm";
import Checkout from "../screens/Cart/Checkout/Checkout";

const Tabs = createMaterialTopTabNavigator();

const CheckoutNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Shipping" component={Checkout} />
      <Tabs.Screen name="Payment" component={Payment} />
      <Tabs.Screen name="Confirm" component={Confirm} />
    </Tabs.Navigator>
  );
};

export default CheckoutNavigator;
