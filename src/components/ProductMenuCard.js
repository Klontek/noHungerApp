import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/styles'

const ProductMenuCard = ({
 productName, 
 price, 
 image}) => {


  return (
    <View style={styles.view1}>
     <View style={styles.view2}>

      <View style={styles.view3}>
       <Text style={styles.text1}>{productName}</Text>
       <Text style={styles.text1}>#{price}</Text>
      </View>

      <View style={styles.view4}>
       <Image
        style={styles.image}
        source={image}
       />
      </View>

     </View>
    </View>
  )
}

export default ProductMenuCard

const styles = StyleSheet.create({
  view1: {
    backgroundColor: 'white',
    shadowOpacity: 0.8, // Increase the shadow opacity
    shadowColor: 'black',
    shadowRadius: 5, // Optional: Set shadow radius
    elevation: 5, // For Android
    margin: 5,
    width: 210,
    padding: 10,
    borderRadius: 10, // Optional: Add border radius
  },
  view2: {
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
  },
  view3: {
    justifyContent: 'space-between',
    width: 110,
  },
  text1: {
    fontSize: 15,
    color: colors.gray7,
  },
  view4: {
    width: 75,
    height: 65,
  },
  image: {
    height: 65,
    width: 75,
    borderRadius: 5, // Optional: Add border radius to the image
  },
});
