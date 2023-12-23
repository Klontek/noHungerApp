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
// import { Icon, Input, SearchBar } from 'react-native-elements';
import { getShopData } from "../../../assets/Data/data";
import SearchBar from "../../components/SearchBar/SearchBar";
import AdminListItem from "./AdminListItem";
// import ListItem from "./ListItem";

// import { useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
// import baseURL from '../../assets/common/baseUrl'
// import AsyncStorage from "@react-native-async-storage/async-storage"

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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        const shopData = await getShopData();
        setData(shopData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched (success or error)
      }
    };

    fetchData();
  }, []);

  // const updateSearch = () => {
  //   return;
  // };
  // const [ProductList, setProductList] = useState();
  // const [productFilter, setProductFilter] = useState();
  //  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState();

  // useFocusEffect(
  //  useCallback(
  //   () => {
  //    // Get Token
  //    AsyncStorage.getItem("jwt").then((res) => {
  //     setToken(res).catch((error) => console.log(error))
  //    })

  //    axios.get(`${baseURL}products`),then((res) => {
  //     setProductList(res.data)
  //     setProductFilter(res.data);
  //     setLoading(false)
  //    })

  //    return () => {
  //     setProductList()
  //     setProductFilter()
  //     setLoading(true)
  //    }
  //   },[]
  //  )
  // )

  // Search functionality to filter searched products
  // const searchProduct = (text) => {
  //   if(text == "") {
  //     setProductFilter(productList)
  //   }
  //   setProductFilter(
  //     productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
  //   )
  // }

  return (
    <View>
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
          data={data}
          ListHeaderComponent={ListHeader}
          keyExtractor={(item) => item.id.$oid.toString()}
          renderItem={({ item, index }) => (
            <AdminListItem
              brand={item.productData[0].brand}
              itemName={item.productData[0].name}
              categoryName={item.productData[0].category.name}
              price={item.productData[0].price}
              image={item.productData[0].image}
              description={item.productData[0].description}
              navigation={navigation}
              index={index}
              {...item}
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
});
export default Products;
