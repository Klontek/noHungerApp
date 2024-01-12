import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl";
import { colors } from "../global/styles";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

const CategoriesComponent = ({ navigation }) => {
  const [indexCheck, setIndexCheck] = useState("");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState();

  const getProductData = () => {
    axios
      .get(`${baseUrl}categories`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        console.log({ error: error, msg: "product Data Api call error" });
      });
  };
  // Products Api
  useFocusEffect(
    useCallback(() => {
      // setCategories(productFilter);
      // setActive(-1);
      setLoading(false);
      getProductData();

      // setProductFilter(productData);

      return () => {
        setProductData([]);
        // setProductFilter([]);
        setFocus();
      };
    }, [])
  );

  // const items = useSelector((state) => state);
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={productData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // console.log("Image URL:", item.image);
          return (
            <Pressable
              onPress={() => {
                setIndexCheck(item._id);
                navigation.navigate("CategoriesRestaurantScreen", {
                  item: item.ShopName,
                });
              }}
            >
              <View
                style={
                  indexCheck === item._id
                    ? { ...styles.categoriesCardSelected }
                    : { ...styles.categoriesCard }
                }
              >
                <Image
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                  source={{ uri: item.image }} // Use the image of the first product
                />

                <View>
                  <Text
                    style={
                      indexCheck === item._id
                        ? { ...styles.categoriesCardTextSelected }
                        : { ...styles.categoriesCardText }
                    }
                  >
                    {item.name} {/* Use the name of the first product */}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default CategoriesComponent;

const styles = StyleSheet.create({
  categoriesCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  categoriesCard: {
    borderRadius: 30,
    backgroundColor: colors.gray5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  categoriesCardTextSelected: {
    fontWeight: "bold",
    color: colors.CardBackground,
  },
  categoriesCardText: {
    fontWeight: "bold",
    color: colors.gray4,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
