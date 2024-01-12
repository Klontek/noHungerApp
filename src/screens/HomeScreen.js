import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CountDown from "react-native-countdown-component";

import { Icon } from "react-native-elements";
import HomeHeader from "../components/HomeHeader";
import { colors, SIZES } from "../global/styles";
// import { getShopData, productFilter } from "../../assets/Data/data";
import { Image } from "react-native-elements";
import FoodCard from "../components/FoodCard";
import ProductList from "./Products/ProductList";
import Banner from "../components/Banner";
import CategoryFilter from "../components/CategoryFilter";
import { useDispatch, useSelector } from "react-redux";
import { CarouselComponent } from "../components/CarouselComponent";
import Heading from "../components/Heading";
import ProductsComponent from "../components/Products/ProductsComponent";
import { addItemToCart } from "../Redux/Actions";
// import CategoryFilter from "../components/CategoryFilter";

import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoriesComponent from "../components/CategoriesComponent";

const SCREEN_WIDTH = Dimensions.get("window").width;

const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation }, props) => {
  // const data = getShopData();
  const [indexCheck, setIndexCheck] = useState("");
  const [delivery, setDelivery] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsCategories, setProductsCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [focus, setFocus] = useState();
  const [productFilter, setProductFilter] = useState([]);

  const dispatch = useDispatch();

  // const getToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("jwt");
  //     return token;
  //   } catch (error) {
  //     console.error("Error getting token:", error);
  //     return null;
  //   }
  // };

  const getProduct = () => {
    axios
      .get(`${baseUrl}products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        // setInitialState(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log({ error: error, msg: "getProduct Api call error" });
      });
  };

  const getProductData = () => {
    axios
      .get(`${baseUrl}productDatas`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error: error, msg: "product Data Api call error" });
      });
  };

  const getShopData = async () => {
    // const token = await getToken();
    axios
      .get(`${baseUrl}shopDatas`)
      .then((res) => {
        setShopData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error: error, msg: "shop Data Api call error" });
      });
    // if (token) {
    //   try {
    //     const response = await axios.get(`${baseUrl}shopDatas`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     console.log("Shop Data Response:", response.data);
    //     setShopData(response.data);
    //   } catch (error) {
    //     console.error("Shop Data API Error:", error);
    //   }
    // }
  };

  // Products Api
  useFocusEffect(
    useCallback(() => {
      // setCategories(productFilter);
      // setActive(-1);

      getProduct();
      // setLoading(false);
      getProductData();
      getShopData();
      setFocus(false);
      // setProductFilter(productData);

      return () => {
        setProducts([]);
        setProductData([]);
        setShopData([]);
        setLoading(true);
        // setProductFilter([]);
        setFocus();
      };
    }, [])
  );

  // // Products Api
  // useFocusEffect()
  // useEffect(() => {
  //   // setCategories(productFilter);
  //   //   setActive(-1);
  //   getProduct();
  //   setLoading(false);
  //   getProductData();
  //   getShopData();
  //   setFocus(false);
  //   setProductFilter(productData);

  //   return () => {
  //     setProducts([]);
  //     setProductData([]);
  //     setShopData([]);
  //     setProductFilter([]);
  //     setFocus();
  //     // setCategories([]);
  //     // setActive();
  //     // setInitialState();
  //   };
  // }, []);

  // search Product
  // const SearchProduct = (text) => {
  //   setProductFilter(
  //     productData.filter((i) =>
  //       i.name.toLowerCase().includes(text.toLowerCase())
  //     )
  //   );
  // };

  const openList = () => {
    setFocus(true);
  };
  // const openBlur = () => {
  //   setFocus(false);
  // };
  // products categories method
  // const changeCategories = (category) => {
  //   category === "all"
  //     ? setProductsCategories(initialState, setActive(true))
  //     : [
  //     setProductsCategories(
  //         products.filter((item) => item.category.id.$oid === category),
  //     setActive(true)
  //       )
  //     ]
  // };

  const items = useSelector((state) => state);
  // console.log(items);

  // const handleAddToCart = () => {
  //   // Dispatch an action to add the current item to the cart
  //   dispatch(addItemToCart(items));
  // };
  return (
    <>
      {loading ? (
        //loading
        <View style={[styles.spinner, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.container}>
          <HomeHeader navigation={navigation} />

          <ScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={true}
          >
            <View
              style={{
                backgroundColor: colors.CardBackground,
                paddingBottom: 5,
              }}
            >
              {/* Delivery and pickup header */}
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setDelivery(true);
                  }}
                >
                  <View
                    style={{
                      ...styles.deliveryButton,
                      backgroundColor: delivery
                        ? colors.buttons
                        : colors.secondary,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.deliveryText,
                        color: delivery ? colors.CardBackground : "black",
                      }}
                    >
                      Delivery
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDelivery(false);
                    navigation.navigate("ShopMapScreen");
                  }}
                >
                  <View
                    style={{
                      ...styles.deliveryButton,
                      backgroundColor: delivery
                        ? colors.secondary
                        : colors.buttons,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.deliveryText,
                        color: delivery ? "black" : colors.CardBackground,
                      }}
                    >
                      Pick Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Address and Now header */}
            <View style={styles.filterHeader}>
              <View style={styles.addressHeader}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  <Icon
                    type="material-community"
                    name="map-marker"
                    color={colors.gray7}
                    size={26}
                  />
                  <Text style={{ marginLeft: 5 }}>UniAbuja</Text>
                </View>

                <View style={styles.clockHeader}>
                  <Icon
                    type="material-community"
                    name="clock-time-four"
                    color={colors.gray7}
                    size={26}
                  />
                  <Text style={{ marginLeft: 5 }}>Now</Text>
                </View>
              </View>

              <View>
                <TouchableOpacity styles={styles.searchBtn}>
                  <Icon
                    name="camera"
                    // style={styles.searchIcon}
                    iconStyle={{ marginLeft: 5, marginVertical: 10 }}
                    type="material-community"
                    size={SIZES.xLarge}
                    // color={colors.offWhite}
                    onPress={() => navigation.navigate("UploadForm")}
                  />
                </TouchableOpacity>
              </View>

              {/* <Pressable
          onPress={() => navigation.navigate('Admin')}
          >
            <Icon type="material-community" name="tune" color={colors.gray7} size={26} />
          </Pressable> */}
            </View>
            {/* Search section */}
            <View>
              <View style={styles.searchContainer}>
                <TouchableOpacity>
                  <Icon
                    name="search"
                    style={styles.searchIcon}
                    iconStyle={{ marginLeft: 5, marginVertical: 10 }}
                    type="material"
                    size={24}
                  />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                  <TextInput
                    value=""
                    onFocus={openList}
                    onPressIn={() => navigation.navigate("Search")}
                    placeholder="What are you looking for?"
                    // onChangeText={(text) => searchProduct(text)}
                    style={styles.searchInput}
                  />
                </View>
              </View>
            </View>
            {/* {focus == true ? (
            ): ()} */}
            {/* Carousel section */}
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10, marginBottom: 10 }}
                horizontal={true}
                data={productData}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <View style={{ margin: 5 }}>
                    <Banner
                      id={item._id}
                      screenWidth={SCREEN_WIDTH * 0.8}
                      image={item.image}
                      shopName={item.ShopName}
                      farAway={item.farAway}
                      businessAddress={item.businessAddress}
                      rating={item.rating}
                      numReview={item.numReviews}
                      countInStock={item.countInStock}
                      // price={item.productData.price}
                      // description={item.productData.description}
                      // navigation={navigation}
                      item={item}
                    />
                  </View>
                )}
              />
            </View>
            {/* <CarouselComponent/> */}
            {/* category Filter */}
            {/* <View>
              <CategoryFilter 
                categories={categories}
                categoryFilter={changeCategories}
                productCategories={productsCategories}
                active={active}
                setActive={setActive}
              />
            </View> */}
            {/* Categories section */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>Categories</Text>
            </View>
            {/* categories component */}
            <CategoriesComponent navigation={navigation} />

            {/* New Arrival section */}
            <View style={styles.categoryHeader}>
              {/* <Text style={styles.categoryHeaderProductsComponentText}>New Arrival</Text> */}
              <Heading />
              <ProductsComponent />
            </View>

            {/* Promotions Available section */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>
                Promotions Available
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                >
                  Options changing in
                </Text>
                {/* <CountDown
                  until={86500}
                  size={14}
                  onFinish={() => console.log("Countdown finished")}
                  digitStyle={{ backgroundColor: colors.lightGreen }}
                  digitTxtStyle={{ color: colors.CardBackground }}
                  timeToShow={["D", "H", "M", "S"]}
                  timeLabels={{ d: "Days", h: "Hours", m: "Min", s: "Sec" }}
                /> */}
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10, marginBottom: 10 }}
                horizontal={true}
                data={shopData}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <View style={{ margin: 5 }}>
                    <FoodCard
                      id={item._id}
                      screenWidth={SCREEN_WIDTH * 0.8}
                      image={item.image}
                      shopName={item.ShopName}
                      farAway={item.farAway}
                      businessAddress={item.businessAddress}
                      rating={item.rating}
                      numReviews={item.numReviews}
                      discount={item.discount}
                      collectTimes={item.collectTimes}
                      deliveryTimes={item.deliveryTimes}
                      foodType={item.foodType}
                      countInStock={
                        item.productData ? item.productData.countInStock : 0
                      }
                      price={item.productData ? item.productData.price : 0}
                      description={
                        item.productData ? item.productData.description : ""
                      }
                      navigation={navigation}
                      item={item}
                    />
                  </View>
                )}
              />
            </View>
            {/* Promotions Available section
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Promotions Available</Text>
        </View>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <FoodCard
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  shopName={item.ShopName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  rating={item.rating}
                  numReview={item.numReviews}
                />
              </View>
            )}
          />
        </View> */}
            {/* Shop Product section */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>Featured Products</Text>
            </View>
            <FlatList
              numColumns={2}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              style={{ marginTop: 10, marginBottom: 10 }}
              data={products}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item, index }) => (
                <View style={{ margin: 5 }}>
                  <ProductList
                    index={index}
                    item={item}
                    navigation={navigation}
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    countInStock={item.countInStock}
                    onAddToCart={(x) => {
                      dispatch(addItemToCart(x));
                    }}
                  />
                </View>
              )}
            />
            {/* Restaurant in your Area Section */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>Stores in Your Area</Text>
            </View>
            <View style={{ paddingTop: 10, width: SCREEN_WIDTH }}>
              {shopData.map((item) => (
                <View key={item._id} style={{ paddingBottom: 20 }}>
                  <FoodCard
                    screenWidth={SCREEN_WIDTH * 0.95}
                    image={item.image}
                    shopName={item.ShopName}
                    farAway={item.farAway}
                    businessAddress={item.businessAddress}
                    rating={item.rating}
                    numReview={item.numReviews}
                    navigation={navigation}
                  />
                </View>
              ))}
            </View>
          </ScrollView>

          {delivery && (
            <View style={styles.floatButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChatScreen")}
              >
                <Icon
                  type="material"
                  name="chat"
                  color={colors.buttons}
                  size={32}
                  style={{ marginTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deliveryButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5,
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 16,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  clockHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.CardBackground,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  addressHeader: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingVertical: 3,
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  categoryHeader: {
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    marginBottom: SIZES.medium,
  },
  categoryHeaderText: {
    color: colors.gray4,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
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
  categoriesCardText: {
    fontWeight: "bold",
    color: colors.gray4,
  },
  categoriesCardTextSelected: {
    fontWeight: "bold",
    color: colors.CardBackground,
  },
  floatButton: {
    position: "absolute",
    right: 15,
    bottom: 10,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.CardBackground,
    alignContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: colors.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: colors.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: 100,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
