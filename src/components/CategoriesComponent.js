import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react"; // Import useEffect
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl";
import { colors } from "../global/styles";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { useDispatch } from "react-redux";

const CategoriesComponent = ({ navigation }) => {
  const [indexCheck, setIndexCheck] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState();
  const [categoryBackground, setCategoryBackground] = useState(true);

  const getCategoryData = () => {
    axios
      .get(`${baseUrl}categories`)
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => {
        console.log({ error: error, msg: "category Data Api call error" }); // Correct log message
      });
  };

  const getProductData = () => {
    // Renamed from getProduct to getProductData for clarity
    axios
      .get(`${baseUrl}products`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error: error, msg: "product Data Api call error" });
      });
  };

  // Fetch category and product data on component mount
  useEffect(() => {
    // Use useEffect instead of useFocusEffect for simplicity
    getCategoryData();
    getProductData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryData}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          // Find the matching product for the current category
          const matchedProduct = productData.find(
            (product) =>
              product.categories && product.categories.includes(item._id) // Check if categories exist and includes the category ID
          );

          return (
            <Pressable
              onPress={() => {
                setIndexCheck(item.id);
                navigation.navigate("CategoriesRestaurantScreen", {
                  item: item.ShopName,
                });
              }}
            >
              <View
                style={[
                  styles.categoriesCard,
                  indexCheck === item.id ? styles.selected : null,
                  index === 0 ? styles.defaultColor : null,
                ]}
              >
                <Image
                  style={styles.image} // Add a style for the image
                  source={{ uri: matchedProduct?.image }} // Use optional chaining
                />

                <View>
                  <Text
                    style={
                      indexCheck === item._id
                        ? styles.categoriesCardTextSelected
                        : styles.categoriesCardText
                    }
                  >
                    {item.name} {/* Use the name of the category */}
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
    width: 100,
    margin: 10,
    height: 50,
  },
  selected: {
    backgroundColor: colors.secondary, // Change to your selected color
  },
  defaultColor: {
    backgroundColor: colors.buttons, // Change to your default color
    color: colors.CardBackground,
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

// const [indexCheck, setIndexCheck] = useState("");
// const [categoryData, setCategoryData] = useState([]);
// const [productData, setProductData] = useState([]);
// const [loading, setLoading] = useState(true);
// const [focus, setFocus] = useState();

// const getCategoryData = () => {
//   axios
//     .get(`${baseUrl}categories`)
//     .then((res) => {
//       setCategoryData(res.data);
//     })
//     .catch((error) => {
//       console.log({ error: error, msg: "product Data Api call error" });
//     });
// };

// const getProduct = () => {
//   axios
//     .get(`${baseUrl}products`)
//     .then((res) => {
//       setProductData(res.data);
//       setLoading(false);
//       // setInitialState(res.data);
//       // console.log(res.data);
//     })
//     .catch((error) => {
//       console.log({ error: error, msg: "getProduct Api call error" });
//     });
// };
// // Products Api
// useFocusEffect(
//   useCallback(() => {
//     // setCategories(productFilter);
//     // setActive(-1);
//     setLoading(false);
//     getCategoryData();
//     getProduct();

//     // setProductFilter(CategoryData);

//     return () => {
//       setCategoryData([]);
//       // setProductFilter([]);
//       setFocus();
//     };
//   }, [])
// );
