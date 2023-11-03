import React, {useState} from 'react'
import {
 View,
 StyleSheet,
 Text,
 Image,
 TouchableOpacity,
 TouchableHighLight,
 Dimensions,
 Button
} from "react-native"
import { Icon } from 'react-native-elements'


const {width} = Dimensions.get('window')

const ListItem = ({
brand,
itemName,
categoryName,
price,
image,
navigation,
index
}) => {
 return (
  <View>
   <TouchableOpacity
     style={[styles.container, {
      backgroundColor: index % 2 == 0 ? 'white' : 'gainsboro'
     }]}
   >
    <Image
      source={image}
      // source={
      //  image
      //  ? image
      //  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
      // }
      resizeMode="contain"
      style={styles.image}
    />

    <Text style={styles.item}>{brand}</Text>
    <Text  style={styles.item} numberOfLines={1} ellipsizeMode="tail">{itemName}</Text>
    <Text style={styles.item}  numberOfLines={1} ellipsizeMode="tail">{categoryName}</Text>
    <Text style={styles.item}>{price}</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flexDirection: 'row',
  padding: 5,
  width: width
 },
 image: {
  borderRadius: 50,
  width: width / 6,
  height: 20,
  margin: 2
 },
 item: {
  flexWrap: 'wrap',
  margin: 3,
  width: width / 6
 }
})

export default ListItem