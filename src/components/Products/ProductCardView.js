import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, SIZES } from "../../global/styles";
import { size } from "lodash";
import { Icon, Image } from "react-native-elements";
// import { useNavigation } from '@react-navigation/native';

const ProductCardView = ({
  item,
  name,
  price,
  image,
  countInStock,
  index,
  navigation,
  onAddToCart,
}) => {
  //  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", {
            item: { name, price, image, countInStock, index },
          })
        }
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>

          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              Count In Stock({countInStock})
            </Text>
            <Text style={styles.title}>₦{JSON.stringify(price)}</Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => onAddToCart(item)}
          >
            <Icon
              name="plus-circle"
              type="material-community"
              size={35}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: colors.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  description: {
    fontSize: SIZES.small,
    color: colors.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
