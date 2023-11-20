import { StyleSheet, View } from 'react-native'
import React from 'react';
import {SlideBox} from  'react-native-image-slider-box'
import { colors } from '../global/styles';

export const CarouselComponent = () => {
  const slides = [
    require("../../assets/images/products/bag_of_beans.jpeg"),
    require("../../assets/images/raw-foods/yam.jpeg"),
    require("../../assets/images/raw-foods/banana.jpeg")
  ]
  return (
    <View style={styles.carouselContainer}>
     <SlideBox images={slides}
      dotColor={colors.primary}
      inactiveDotColor={colors.secondary}
      ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}
      autoplay
      circleLoop
      />
    </View>
  )
}



const styles = StyleSheet.create({
 carouselContainer: {
  flex: 1,
  alignItems: 'center'
 }
})