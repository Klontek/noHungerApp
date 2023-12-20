import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors, SIZES } from "../../global/styles";
import { Icon } from "react-native-elements";
import Toast from "react-native-toast-message";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ProductCard = ({
  name,
  price,
  image,
  countInStock,
  onAddToCart,
  item,
  index,
  navigation,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            Count In Stock ({countInStock})
          </Text>
          <Text style={styles.title}>₦{price}</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            onAddToCart(item),
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${name} added to basket`,
              });
          }}
        >
          <Icon
            name="plus-circle"
            type="material-community"
            size={35}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
    // <View style={styles.container}>
    //  <Image
    //   style={styles.image}
    //   resizeMode='contain'
    //   source={image}
    //  />
    //  <View style={styles.card}/>
    //  <Text style={styles.title}>
    //   {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name
    //   }
    //  </Text>
    //  <Text style={styles.price}>#{price}</Text>

    //  {
    //   countInStock > 0 ? (
    //     <TouchableOpacity>
    //       <View style={{marginBottom: 60}}>
    //         <Button
    //         title={'Add'}
    //         color={colors.buttons}
    //         />
    //       </View>
    //     </TouchableOpacity>

    //   ) :
    //   <Text style={{marginTop: 20}}>Currently Unavailable</Text>
    //  }
    // </View>
  );
};

const styles = StyleSheet.create({
  // containerWrapper: {
  // width: SCREEN_WIDTH / 2 - 20,
  // height: SCREEN_WIDTH / 1.7,
  // padding: 10,
  // borderRadius: 10,
  // marginTop: 55,
  // marginBottom: 5,
  // marginLeft: 10,
  // alignItems: 'center',
  // elevation: 8,
  // // backgroundColor: 'inherit',
  // },
  container: {
    width: SCREEN_WIDTH / 2 - 20,
    height: SCREEN_WIDTH / 1.7,
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

// const styles = StyleSheet.create({
//  container: {
//   width: SCREEN_WIDTH / 2 - 20,
//   height: SCREEN_WIDTH / 1.7,
//   padding: 10,
//   borderRadius: 10,
//   marginTop: 55,
//   marginBottom: 5,
//   marginLeft: 10,
//   alignItems: 'center',
//   elevation: 8,
//   backgroundColor: 'inherit',

//  },
//  image: {
//   width: SCREEN_WIDTH / 2 - 20 - 10,
//   height: SCREEN_WIDTH / 2 - 20 - 30,
//   backgroundColor: 'transparent',
//   position: 'absolute',
//   top: -45
//  },
//  card: {
//   marginBottom: 10,
//   height: SCREEN_WIDTH / 2 - 20 - 90,
//   backgroundColor: 'transparent',
//   width: SCREEN_WIDTH / 2 - 20 -10
//  },
//  title: {
//   fontWeight: 'bold',
//   fontSize: 14,
//   textAlign: 'center'
//  },
//  price: {
//   fontSize: 20,
//   color: 'orange',
//   marginTop: 10
//  }
// })

export default ProductCard;
