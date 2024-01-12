import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList, // Corrected import
  Dimensions,
  TextInput,
} from "react-native";
import EasyButton from "../../Shared/StyledComponent";
import baseUrl from "../../../assets/Common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../global/styles";
import { getShopData } from "../../../assets/Data/data";

let { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <EasyButton danger medium onPress={() => props.delete(props.item.id)}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </EasyButton>
    </View>
  );
};

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  //=========   dummy categories    ============//
  const extractCategories = (shopData) => {
    const categories = new Set();

    shopData.forEach((shop) => {
      shop.productData.forEach((product) => {
        const { category } = product;
        if (category) {
          categories.add(category);
        }
      });
    });

    // Convert Set to array and return
    return Array.from(categories);
  };

  const shopData = getShopData();
  useEffect(() => {
    // Extract unique categories from shopData
    const extractedCategories = extractCategories(shopData);
    setCategories(extractedCategories);

    // Cleanup function to clear categories when the component unmounts
    return () => {
      setCategories([]);
    };
  }, []);
  //=========   end of dummy categories    ============//

  // useEffect for Api
  // useEffect(() => {
  //   AsyncStorage.getItem("jwt")
  //     .then((res) => {
  //       setToken(res);
  //     })
  //     .catch((error) => console.log(error));

  //   axios
  //     .get(`${baseUrl}categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((error) => alert("Error loading categories"));

  //   return () => {
  //     setCategories([]);
  //     setToken();
  //   };
  // });

  // add category functionality
  // const addCategory = () => {
  //   const category = {
  //     name: categoryName
  //   };
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   };

  //   axios
  //     .post(`${baseUrl}categories`, category, config)
  //     .then((res) => setCategories([...categories, res.data]))
  //     .catch((error) => alert("Error loading categories"));

  //     setCategoryName("");
  // }

  // const deleteCategory = (id) => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     };

  //     axios
  //       .delete(`${baseUrl}categories/${id}`, config)
  //       .then((res) => {
  //         const newCategories = categories.filter((item) => item.id !== id);
  //         setCategories(newCategories);
  //       })
  //       .catch((error) => alert("Error loading categories"));
  // }

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            // <Item item={item} index={index} delete={deleteCategory} />
            <Item item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
            style={styles.input}
          />
        </View>
        <View>
          <EasyButton
            medium
            primary
            // onPress={() =>
            //   addCategory()
            // }
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.CardBackground,
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  input: {
    height: 40,
    borderColor: colors.buttons,
    borderWidth: 1,
    borderRadius: 10,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});
