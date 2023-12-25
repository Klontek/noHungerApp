import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrafficLight from "../Shared/TrafficLight";
import EasyButton from "../Shared/StyledComponent";
import Toast from "react-native-toast-message";
import RNPickerSelect from "react-native-picker-select";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status === "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending...");
      setCardColor("#E74C3C");
    } else if (props.status === "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#2ECC71");
    } else {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#E74C3C");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItem: props.orderItem,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      zip: props.zip,
    };

    axios
      .put(`${baseUrl}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: `Please try again ${error}`,
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        {/* <Text>Date Ordered: {props.dateOrdered.split("T")[0]}</Text> */}
      </View>
      <View style={styles.priceContainer}>
        <Text>Price:</Text>
        <Text style={styles.price}># {props.totalPrice}</Text>
      </View>

      {/* Use react-native-picker-select */}
      {props.editMode ? (
        <View>
          <RNPickerSelect
            placeholder={{
              label: "Change Orders",
              value: null,
              color: "#9EA0A4",
            }}
            onValueChange={(value) => setStatusChange(value)}
            items={codes.map((c) => ({ label: c.name, value: c.code }))}
            value={statusChange}
            style={{ width: "100%" }}
          />
          <EasyButton secondary large onPress={() => updateOrder()}>
            <Text style={{ color: "white" }}>Update</Text>
          </EasyButton>
        </View>
      ) : null}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});
