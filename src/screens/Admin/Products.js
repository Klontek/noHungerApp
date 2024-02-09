import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
// import { Icon, Input, SearchBar } from 'react-native-elements';
import { getShopData } from "../../../assets/Data/data";
import SearchBar from "../../components/SearchBar/SearchBar";
import { colors } from "../../global/styles";
import EasyButton from "../../Shared/StyledComponent";
import AdminListItem from "./AdminListItem";
// import ListItem from "./ListItem";

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
// import baseURL from '../../assets/common/baseUrl'
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../../assets/Common/baseUrl";

// ProductHeader

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 600 }}>Image</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 600 }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 600 }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 600 }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 600 }}>Price</Text>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const Products = () => {
  // const [data, setData] = useState([]);
  // const [search, setSearch] = useState("");
  // const navigation = useNavigation();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate data fetching
  //   const fetchData = async () => {
  //     try {
  //       const shopData = await getShopData();
  //       setData(shopData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false after data is fetched (success or error)
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const updateSearch = () => {
  //   return;
  // };
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     // Get Token
  //     AsyncStorage.getItem("jwt").then((res) => {
  //       setToken(res).catch((error) => console.log(error));
  //     });

  //     axios.get(`${baseUrl}productData`).then((res) => {
  //       setProductList(res.data);
  //       setProductFilter(res.data);
  //       setLoading(false);
  //     });

  //     return () => {
  //       setProductList();
  //       setProductFilter();
  //       setLoading(true);
  //     };
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res); // No need for catch here
        })
        .catch((error) => console.log(error)); // Move the catch outside the setToken

      axios
        .get(`${baseUrl}productDatas`)
        .then((res) => {
          setProductList(res.data);
          setProductFilter(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Make sure to set loading to false even in case of an error
        });

      return () => {
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
      };
    }, [])
  );

  // Search functionality to filter searched products
  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  // delete functionality for products
  const deleteProduct = (id) => {
    axios
      .delete(`${baseUrl}productDatas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          medium
          secondary
          onPress={() => navigation.navigate("Orders")}
        >
          <Icon
            type="material-community"
            name="shopping"
            color={colors.CardBackground}
            size={18}
          />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>

        <EasyButton
          medium
          secondary
          onPress={() => navigation.navigate("ProductForm")}
        >
          <Icon
            type="material-community"
            name="plus"
            color={colors.CardBackground}
            size={18}
          />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton>

        <EasyButton
          medium
          secondary
          onPress={() => navigation.navigate("Categories")}
        >
          <Icon
            type="material-community"
            name="shape"
            color={colors.CardBackground}
            size={18}
          />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>
      <View>
        <SearchBar />
        {/* <Header searchBar rounded>
          <Item style={{padding: 5}}>
            <Icon name="Search"/>
            <Input
              placeholder="search"
              onChangeText={(text) => searchProducts(text)}
            />
          </Item>
        </Header> */}
      </View>
      {loading ? (
        <View>
          <ActivityIndicator style={styles.spinner} size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productList}
          ListHeaderComponent={ListHeader}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <AdminListItem
              brand={item.brand}
              itemName={item.name}
              categoryName={item.category.name}
              price={item.price}
              image={item.image}
              description={item.description}
              navigation={navigation}
              index={index}
              {...item}
              deleteProduct={deleteProduct}
            />
          )}
        />
      )}
    </View>
  );
};
// original return statement
// return (
//   <View>
//     <View>
//       <SearchBar />
//     </View>
//     {loading ? (
//       <View>
//         <ActivityIndicator style={styles.spinner} size="large" color="red" />
//       </View>
//     ) : (
//       <FlatList
//         data={data}
//         ListHeaderComponent={ListHeader}
//         keyExtractor={(item) => item.id.$oid.toString()}
//         renderItem={({ item, index }) => (
//           <ListItem
//             brand={item.productData[0].brand}
//             itemName={item.productData[0].name}
//             categoryName={item.productData[0].category.name}
//             price={item.productData[0].price}
//             image={item.productData[0].image}
//             description={item.productData[0].description}
//             navigation={navigation}
//             index={index}
//             {...item}
//           />
//         )}
//       />
//     )}

//     {/* {loading ? (
//      <View>
//       <ActivityIndicator style={styles.spinner} size="large" color="red"/>
//      </View>
//     ): (
//      <FlatList
//       data={data}
//       renderItem={({item, index}) => {
//        <Text>{item.productData[0].name}</Text>
//       }}
//       keyExtractor={item => item.id.$oid}
//      />
//     )} */}
//   </View>
// );
//};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});
export default Products;
