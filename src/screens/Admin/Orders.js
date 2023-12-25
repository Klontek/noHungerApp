import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
// import axios from "axios"
// import baseUrl from "../../../assets/Common/baseUrl";
// import { useFocusEffect } from "@react-navigation/native";
import { customerOrders } from "../../../assets/Data/data";
import OrderCard from "../../components/OrderCard";

const Orders = (props) => {
  const [orderList, setOrderList] = useState();

  // useEffect for dummy data
  useEffect(() => {
    // Fetch customerOrders data and set it to orderList state
    setOrderList(customerOrders);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // useFocusEffect(
  //   useCallback(
  //     () => {
  //       getOrders();
  //       return () => {
  //         setOrderList()
  //       }
  //     },
  //     []
  //   )
  // )

  // const getOrders = () => {
  //   axios
  //     .get(`${baseUrl}orders`)
  //     .then((res) => {
  //       setOrderList(res.data)
  //     })
  //     .catch((error) => console.log(error))
  // }
  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id.toString()} // Assuming id is unique
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
