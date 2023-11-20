import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { SIZES } from "../../global/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ProductList({
  name,
  price,
  image,
  countInStock,
  navigation,
  index,
  onAddToCart,
  item,
}) {
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          item: { name, price, image, countInStock, index },
        })
      }
    >
      <View style={{ width: SCREEN_WIDTH / 2 }}>
        <ProductCard
          item={item}
          name={name}
          price={price}
          image={image}
          countInStock={countInStock}
          navigation={navigation}
          index={index}
          onAddToCart={onAddToCart}
        />
      </View>
    </TouchableOpacity>

    //  <TouchableOpacity
    //   style={{ width: '50%' }}
    //     onPress={() =>
    //       navigation.navigate("SingleProduct",
    //      { item: {  name, price, image, countInStock}} )
    //     }
    //  >
    //   <View style={{ width: SCREEN_WIDTH / 2, backgroundColor: 'white' }}>
    //    <ProductCard
    //       name={name}
    //       price={price}
    //       image={image}
    //       countInStock={countInStock}
    //    />
    //   </View>
    //  </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
  },
});
