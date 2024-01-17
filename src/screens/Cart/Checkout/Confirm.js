// import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import {
//   Container,
//   Header,
//   Content,
//   ListItem,
//   Text,
//   Radio,
//   Right,
//   Left,
//   Picker,
//   Icon,
//   Body,
//   Title,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { colors } from "../../../global/styles";
// import { Button } from "react-native-elements";

// const {height, width} = Dimensions.get("window")

// const Confirm = (props) => {

//   const cartData = useSelector(state => state)
//   const dispatch = useDispatch()

//   const confirm =  props.route.params

//   const confirmOrder = () => {
//     setTimeout(() =>{
//       props.clearCart() // redux functionality to clear cart
//       props.navigation.navigate("CartScreen")
//     }, 500)
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>

//         {props.route.params ? (
//           <View style={{ borderWidth: 1, borderColor: "orange" }}>
//             <Text style={styles.shipping}>Shipping to {">>"}</Text>
//             <Text>Address: {confirm.order.order.shippingAddress1}</Text>
//             <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
//             <Text>City: {confirm.order.order.city}</Text>
//             <Text>Zip Code: {confirm.order.order.zip}</Text>
//             <Text>Country: {confirm.order.order.country}</Text>

//             <Text style={styles.title}>
//               {confirm.order.order.orderItem.map((x) => {
//                 return (
//                   <listItem style={styles.listItem} key={x.product.name} avatar>
//                     <Left>
//                       <Thumbnail source={{ uri: x.product.image }} />
//                     </Left>
//                     <Body style={styles.body}>
//                       <Left>
//                         <Text>{x.product.name}</Text>
//                       </Left>
//                       <Right>
//                         <Text>#{x.product.price}</Text>
//                       </Right>
//                     </Body>
//                   </listItem>
//                 );
//               })}
//             </Text>
//           </View>
//         ) : null}

//         <View style={{ alignItems: "center", margin: 20 }}>
//           <Button title={"Place Order"} onPress={confirmOrder} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Confirm;

// const styles = StyleSheet.create({
//   container: {
//     height: height,
//     padding: 8,
//     alignItems: "center",
//     backgroundColor: colors.CardBackground
//   },
//   titleContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 8
//   },
//   title: {
//     alignSelf: "center",
//     margin: 8,
//     fontSize: 16,
//     fontWeight: "bold"
//   },
//   listItem: {
//     alignItems: "center",
//     backgroundColor: colors.CardBackground,
//     justifyContent: "center",
//     width: width / 1.2
//   },
//   body: {
//     margin: 10,
//     alignItems: "center",
//     flexDirection: "row"
//   }
// });

import React from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { Button, List, Text, Title, Subheading } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../global/styles";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseUrl from "../../../../assets/Common/baseUrl";

const { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const cartData = useSelector((state) => state);
  const dispatch = useDispatch();

  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;

    axios
      .post(`${baseUrl}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart(); // redux functionality to clear cart
            props.navigation.navigate("CartScreen");
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
  // const confirm = props.route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={{ fontSize: 20, fontWeight: "bold" }}>
          Confirm Order
        </Title>

        {props.route.params ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: "orange",
              marginVertical: 10,
            }}
          >
            <Subheading style={styles.shipping}>Shipping to {">>"}</Subheading>
            <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
            <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
            <Text>City: {finalOrder.order.order.city}</Text>
            <Text>Zip Code: {finalOrder.order.order.zip}</Text>
            <Text>Country: {finalOrder.order.order.country}</Text>

            <List.Section>
              {finalOrder.order.orderItem.map((x) => (
                <List.Item
                  key={x.product.name}
                  title={x.product.name}
                  description={`#${x.product.price}`}
                  left={() => <List.Icon icon="image" />}
                />
              ))}
            </List.Section>
          </View>
        ) : null}

        <View style={{ alignItems: "center", margin: 20 }}>
          <Button
            mode="contained"
            // onPress={
            //   {
            //     /*confirmOrder*/
            //   }
            // }
          >
            Place Order
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignItems: "center",
    backgroundColor: colors.CardBackground,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  shipping: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
