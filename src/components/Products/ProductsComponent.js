import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { menuDetailedData } from '../../../assets/Data/data'
import { SIZES } from "../../global/styles";
import ProductCardView from "./ProductCardView";
import { getShopData } from "../../../assets/Data/data";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Redux/Actions";

const dataset = getShopData();

const ProductsComponent = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Concatenate products from all shops in the dataset
    const allProducts = dataset.reduce(
      (allProds, shop) => allProds.concat(shop.productData),
      []
    );
    setProducts(allProducts);

    return () => {
      setProducts([]);
    };
  }, []);

  const items = useSelector((state) => state);
  console.log(items);
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.$oid}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCardView
            item={item}
            name={item.name}
            price={item.price}
            image={item.image}
            countInStock={item.countInStock}
            index={index}
            navigation={navigation}
            onAddToCart={(x) => {
              dispatch(addItemToCart(x));
            }} // Pass the navigation prop to ProductCardView
          />
        )}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ProductsComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
  },
});
