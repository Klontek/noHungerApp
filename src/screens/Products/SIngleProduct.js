import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../global/styles";

const windowWidth = Dimensions.get("window").width;

export const SingleProduct = ({
  route,
  navigation,
  navigation: { goBack },
}) => {
  const [item, setItem] = useState(route.params.item);
  const [availability, setAvailability] = useState("");
  const { shopName, price, image, countInStock, description } =
    route.params.item;

  //carouse imports
  const [index, setIndex] = React.useState(0);
  const [seeMore, setSeeMore] = React.useState(false);
  const isCarousel = React.useRef(null);
  const dispatch = useDispatch();

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 0,
          width: "100%",
          paddingBottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}
        key={index}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 300,
            height: 300,
          }}
          resizeMode={"cover"}
        />
      </View>
    );
  };

  const ScreenButtons = ({ CartScreenName }) => {
    const navigation = useNavigation();

    return (
      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            borderRadius: 5,
            backgroundColor: colors.buttons,
            justifyContent: "center",
            alignItems: "center",
          }}
          // onPress={() => navigation.navigate(CheckoutScreenName)}
          onPress={() => {}}

          // onPress={() =>
          //   navigation.navigate("Cart", {
          //     itemId: itemId,
          //     itemTitle: itemTitle,
          //     itemPrice: itemPrice,
          //     itemImage: itemImage,
          //     carouselDataIndex: carouselDataIndex,
          //   })
          // }
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Add to Basket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            borderRadius: 5,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            borderWidth: 3,
            borderColor: colors.buttons,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Go to Basket
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <CustomHeader onPressBack={() => goBack()} />
      {/* <Header
        HeaderIconName="arrow-back"
        onPressMenu={() => goBack()}
        onPressCart={() => navigation.navigate('Cart')}
      /> */}

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 0,
          }}
        >
          <View style={{ width: "100%" }}>
            <_renderItem item={{ uri: image }} index={0} />

            {/* <Carousel
              layout="default"
              layoutCardOffset={0}
              ref={isCarousel}
              data={itemOtherImages}
              renderItem={_renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            /> */}
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Pagination
              dotsLength={itemOtherImages.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                marginTop: 0,
                backgroundColor: "rgba(0, 0, 0, 0.92)",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            /> */}
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{shopName}</Text>
        </View>
        {/* set the number of lines to four but with a see more button*/}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            numberOfLines={seeMore ? null : 4}
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            {description}
          </Text>
          <TouchableOpacity
            onPress={() => {
              //see more functionality
              setSeeMore(!seeMore);
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                marginBottom: 10,
                color: "blue",
              }}
            >
              See more
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            ₦{JSON.stringify(price * 15)}
          </Text>
        </View> */}

        <View style={{ padding: 20 }}>
          <ScreenButtons CartScreenName="CartScreen" />
        </View>
        <View style={{ height: 300 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: colors.CardBackground,
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
