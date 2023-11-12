// import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View, Text, Image, StyleSheet, Dimension, TouchableOpacity} from "react-native"
import {Icon} from "react-native-elements";

import { colors, parameters } from "../global/styles";


export default function FoodCard({
  id,
 onPressFoodCard,
 shopName,
 deliveryAvailable,
 discountAvailable,
 discountPercent,
 numReview,
 businessAddress,
 farAway,
 rating,
 images,
 screenWidth,
 price,
 countInStock,
 description,
 navigation
}){

  // const navigation = useNavigation()
 return (
  <TouchableOpacity
  onPress={() => {
    navigation.navigate("SingleProduct", {item: {  id,shopName, price, images, countInStock,description}})
  }}
  >

   <View style={{...styles.cardView, width: screenWidth}}>
    <Image
    style={{...styles.image, width: screenWidth}}
    source={images}
    />

   <View>
    <View>
     <Text style={styles.shopName}>{shopName}</Text>
    </View>
   </View>

   <View style={{flex: 1, flexDirection: 'row'}}>
    <View style={styles.distance}>
     <Icon 
      type="material" 
      name="place" 
      color={colors.gray8} 
      size={18} 
      iconStyle={{
       marginTop: 3
      }}
      />
      <Text style={styles.minutes}>{farAway} Min</Text>
    </View>

    <View style={{flex: 9, flexDirection: 'row'}}>
     <Text style={styles.address}>{businessAddress}</Text>
    </View>
   </View>
   </View>


   <View style={styles.review}>
    <Text style={styles.rating}>{rating}</Text>
    <Text style={styles.numReview}>{numReview} reviews</Text>
   </View>

  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 cardView: {
  marginHorizontal: 9,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  borderWidth: 1,
  borderColor: colors.gray4,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5
 },
 image: {
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  height: 150
 },
 shopName: {
  fontSize: 17,
  fontWeight: 'bold',
  color: colors.gray4,
  marginTop: 5,
  marginLeft: 10
 },
 distance: {
  flex: 4,
  flexDirection: 'row',
  paddingHorizontal: 5,
  borderRightColor: colors.gray4,
  borderRightWidth: 1
 },
 minutes: {
  fontSize: 12,
  fontWeight: 'bold',
  paddingTop:5,
  color: colors.gray4
 },
 address: {
  fontSize: 12,
  paddingTop:5,
  color: colors.gray4,
  paddingHorizontal: 10
 },
 review: {
  position: 'absolute',
  top: 0,
  right: 10,
  backgroundColor: 'rgba(52, 52, 52, 0.3)',
  padding: 2,
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: 5,
  borderBottomLeftRadius: 12
 },
 rating:{
  color: colors.CardBackground,
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 3
 },
 numReview: {
  color: colors.CardBackground,
  fontSize: 13,
  marginRight: 10,
  marginLeft: 0
 }
})