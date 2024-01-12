import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, SIZES } from "../../global/styles";
import { Icon, Image } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addToWishList } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import TrafficLight from "../../Shared/TrafficLight";

const ProductDetail = ({ route, navigation, navigation: { goBack } }) => {
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(route.params.item);
  const [availability, setAvailability] = useState(null);
  const { index, name, price, image, countInStock, description } =
    route.params.item;
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  console.log(items);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="material-community" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={(x) => dispatch(addToWishList(x))}>
          <Icon name="favorite" type="material" size={30} color="red" />
        </TouchableOpacity>
      </View>

      <Image key={index} source={{ uri: image }} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.title}>₦{JSON.stringify(price)}</Text>
          </View>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 8 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Icon
                key={index}
                name="star"
                type="material-community"
                size={24}
                color="gold"
              />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrement()}>
              <Icon
                name="minus-circle-outline"
                type="material-community"
                size={27}
              />
            </TouchableOpacity>

            <Text style={styles.ratingText}> {count}</Text>
            <TouchableOpacity onPress={() => increment()}>
              <Icon
                name="plus-circle-outline"
                type="material-community"
                size={27}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            {description}
            {/* Choose your 2 d dips', 'Choose your 1st drink flavour', 'Would you
            like extra source?', 'would you like add our tasty Beefs/chicken
            variety? */}
          </Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="place" type="material" size={20} />
              <Text> Location</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="truck-delivery-outline"
                type="material-community"
                size={20}
              />
              <Text>
                {" "}
                Free Delivery{" "}
                <Text style={{ fontSize: 10, color: colors.buttons }}>
                  {" "}
                  Coming Soon!
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CartScreen")}
            style={styles.addCart}
          >
            <Icon
              type="material-community"
              name="basket"
              size={22}
              color={colors.CardBackground}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: "white",
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: colors.buttons,
    borderRadius: SIZES.large,
  },
  price: {
    fontSize: SIZES.large,
    padding: 10,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: colors.gray,
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
    top: 20,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: colors.buttons,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontSize: SIZES.medium,
    color: colors.lightWhite,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: colors.buttons,
    alignItems: "center",
    justifyContent: "center",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
