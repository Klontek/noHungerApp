import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import Countdown from "react-native-countdown-component";
import { Icon } from "react-native-elements";
import HomeHeader from "../components/HomeHeader";
import { colors, SIZES } from "../global/styles";
import { getShopData, productFilter } from "../../assets/Data/data";
import { Image } from "react-native-elements/dist/image/Image";
import FoodCard from "../components/FoodCard";
import ProductList from "./Products/ProductList";
import Banner from "../components/Banner";
import CategoryFilter from "../components/CategoryFilter";
import { useDispatch, useSelector } from "react-redux";
import { CarouselComponent } from "../components/CarouselComponent";
import Heading from "../components/Heading";
import ProductsComponent from "../components/Products/ProductsComponent";
import { addItemToCart } from "../Redux/Actions";

const data = getShopData();
const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = ({ navigation }, props) => {
  const [indexCheck, setIndexCheck] = useState("a12df2329dfjl89ppo3");
  const [delivery, setDelivery] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsCategories, setProductsCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(data);
    setCategories(productFilter);
    setActive(-1);
    setInitialState(data);
    return () => {
      setProducts([]);
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  //products categories method
  // const changeCategories = (category) => {
  //   category === 'all'
  //     ? setProductsCategories(initialState)
  //     : setProductsCategories(
  //         products.filter((item) => item.category.id.$oid === category)
  //       );
  //   setActive(true);
  // };

  const items = useSelector((state) => state);
  console.log(items);

  // const handleAddToCart = () => {
  //   // Dispatch an action to add the current item to the cart
  //   dispatch(addItemToCart(items));
  // };
  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />

      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View
          style={{ backgroundColor: colors.CardBackground, paddingBottom: 5 }}
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
                  backgroundColor: delivery ? colors.buttons : colors.secondary,
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
                  backgroundColor: delivery ? colors.secondary : colors.buttons,
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
              <Text style={{ marginLeft: 5 }}>24 Iddo street Uniabuja</Text>
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
                onPressIn={() => navigation.navigate("Search")}
                placeholder="What are you looking for?
                "
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>

        {/* Carousel section */}

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={getShopData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <Banner
                  id={item.id.$oid}
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  shopName={item.ShopName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  rating={item.rating}
                  numReview={item.numReviews}
                  countInStock={item.productData[0].countInStock}
                  price={item.productData[0].price}
                  description={item.productData[0].description}
                  // navigation={navigation}
                  item={item}
                />
              </View>
            )}
          />
        </View>

        {/* <CarouselComponent/> */}

        {/* Featured Products section */}
        <View style={styles.categoryHeader}>
          {/* <Text style={styles.categoryHeaderProductsComponentText}>New Arrival</Text> */}
          <Heading />
          <ProductsComponent />
        </View>

        {/* Categories section */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Categories</Text>
        </View>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={getShopData()}
            keyExtractor={(item) => item.id.$oid}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setIndexCheck(item.id.$oid);
                  navigation.navigate("CategoriesRestaurantScreen", {
                    item: item.ShopName,
                  });
                }}
              >
                <View
                  style={
                    indexCheck === item.id.$oid
                      ? { ...styles.categoriesCardSelected }
                      : { ...styles.categoriesCard }
                  }
                >
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={item.productData[0].image} // Use the image of the first product
                  />

                  <View>
                    <Text
                      style={
                        indexCheck === item.id.$oid
                          ? { ...styles.categoriesCardTextSelected }
                          : { ...styles.categoriesCardText }
                      }
                    >
                      {item.productData[0].name}{" "}
                      {/* Use the name of the first product */}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Promotions Available section */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Promotions Available</Text>
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
            <Countdown
              until={86400}
              size={14}
              digitStyle={{ backgroundColor: colors.lightGreen }}
              digitTxtStyle={{ color: colors.CardBackground }}
              timeToShow={["D", "M", "S"]}
              timeLabels={{ d: "Days", m: "Min", s: "Sec" }}
            />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={getShopData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <FoodCard
                  id={item.id.$oid}
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  shopName={item.ShopName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  rating={item.rating}
                  numReview={item.numReviews}
                  countInStock={item.productData[0].countInStock}
                  price={item.productData[0].price}
                  description={item.productData[0].description}
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
            data={getShopData()}
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ margin: 5 }}>
              <ProductList
                index={index}
                item={item}
                navigation={navigation}
                key={item.productData[0].id}
                name={item.productData[0].name}
                price={item.productData[0].price}
                image={item.productData[0].image}
                countInStock={item.productData[0].countInStock}
                onAddToCart={(x) => {
                  dispatch(addItemToCart(x));
                }}
              />
            </View>
          )}
        />

        {/* Restaurant in your Area Section */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>
            Restaurants in Your Area
          </Text>
        </View>

        <View style={{ paddingTop: 10, width: SCREEN_WIDTH }}>
          {getShopData().map((item) => (
            <View key={item.id.$oid} style={{ paddingBottom: 20 }}>
              <FoodCard
                screenWidth={SCREEN_WIDTH * 0.95}
                images={item.images}
                shopName={item.ShopName}
                farAway={item.farAway}
                businessAddress={item.businessAddress}
                rating={item.rating}
                numReview={item.numReviews}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {delivery && (
        <View style={styles.floatButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ShopMapScreen")}
          >
            <Icon
              type="material"
              name="place"
              color={colors.buttons}
              size={32}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    backgroundColor: colors.gray5,
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
    borderRadius: 30,
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
});

export default HomeScreen;
