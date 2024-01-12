import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, colors, Image } from "react-native-elements";

const CartItem = ({ item, onRemoveItem }) => {
  const [qty, setQty] = useState(1);
  // Handle function for + -
  const handleAddQty = () => {
    if (qty === 10) return alert("you cant add more than 10 quantity");
    setQty((prev) => prev + 1);
  };
  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.name}> {item?.name}</Text>
        <Text style={styles.name}> Price : {item?.price}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
          {/* {" "} */}
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text>{qty}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Button
            title="X"
            buttonStyle={{ backgroundColor: "red" }}
            onPress={() => {
              onRemoveItem();
            }}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
  deleteBtn: {
    fontSize: 20,
    color: "red",
  },
});
