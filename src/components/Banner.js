import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import Swiper from "react-native-swiper";
import { useNavigation } from '@react-navigation/native';



const SCREEN_WIDTH = Dimensions.get("window").width

export default function Banner(
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
//  navigation
) {

  const navigation = useNavigation()

 const [bannerData, setBannerData] = useState([])

 useEffect(()=> {
  setBannerData([
     "https://plus.unsplash.com/premium_photo-1667251759185-177b6e703e26?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D",

     "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D",

     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
  ])
  return () => {
   setBannerData([])
  }
 }, [])


  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
       <Swiper
         style={{height: SCREEN_WIDTH / 2}}
         showsButtons={false}
         autoplay={true}
         autoplayTimeout={2}
       >
        {bannerData.map((item) => {
         return (
          <TouchableOpacity
            onPress={() => {
            navigation.navigate("BannerSingleProduct", {item: {  id,shopName, price, images, countInStock,description}})
            }}
          >
            <Image
              key={item}
              style={styles.imageBanner}
              resizeMode='contain'
              source={{uri: item}}
            />
          </TouchableOpacity>

         )         
        })}
       </Swiper>
       <View style={{height: 20}}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: 'gainsboro'
 },
 swiper: {
  width: SCREEN_WIDTH,
  alignItems: 'center',
  marginTop: 10
 },
 imageBanner: {
  height: SCREEN_WIDTH / 2,
  width: SCREEN_WIDTH  - 40,
  borderRadius: 10,
  marginHorizontal: 20
 }
})