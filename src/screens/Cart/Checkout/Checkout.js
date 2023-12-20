import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import FormContainer from "../../../components/Form/FormContainer";
import Input from "../../../components/Form/Input";
import RNPickerSelect from "react-native-picker-select";
import { View } from "react-native";
import { colors } from "../../../global/styles";

// const dispatch = useDispatch();

const Checkout = ({ navigation }) => {
  const [orderItem, setOrderItem] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const countries = require("../../../../assets/Data/countries.json");

  useEffect(() => {
    setOrderItem(cartData);

    return () => {
      setOrderItem();
    };
  }, []);

  const cartData = useSelector((state) => state);

  const CheckoutBtn = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };
    navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"Shipping Address1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"Shipping Address2"}
          value={address}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        {/* Use react-native-picker-select */}
        <RNPickerSelect
          placeholder={{
            label: "Select your country",
            value: null,
            color: "#9EA0A4",
          }}
          onValueChange={(value) => setCountry(value)}
          items={countries.map((c) => ({ label: c.name, value: c.name }))}
        />

        <View style={{ width: "80%", alignItems: "center" }}>
          <Button
            buttonStyle={{ backgroundColor: colors.buttons }}
            title="Confirm"
            onPress={() => CheckoutBtn()}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Checkout;
