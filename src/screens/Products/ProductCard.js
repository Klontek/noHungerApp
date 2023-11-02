import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../global/styles'



const SCREEN_WIDTH = Dimensions.get('window').width

const  ProductCard = ({name, price, image, countInStock}) => {
 
  return (
    <View style={styles.container}>
     <Image
      style={styles.image}
      resizeMode='contain'
      source={image}
     />
     <View style={styles.card}/>
     <Text style={styles.title}>
      {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name
      }
     </Text>
     <Text style={styles.price}>#{price}</Text>

     {
      countInStock > 0 ? (
        <TouchableOpacity>
          <View style={{marginBottom: 60}}>
            <Button 
            title={'Add'} 
            color={colors.buttons}
            />
          </View>
        </TouchableOpacity>

      ) :
      <Text style={{marginTop: 20}}>Currently Unavailable</Text>
     }
    </View>
  )
}


const styles = StyleSheet.create({
 container: {
  width: SCREEN_WIDTH / 2 - 20,
  height: SCREEN_WIDTH / 1.7,
  padding: 10,
  borderRadius: 10,
  marginTop: 55,
  marginBottom: 5,
  marginLeft: 10,
  alignItems: 'center',
  elevation: 8,
  backgroundColor: 'inherit',
  
 },
 image: {
  width: SCREEN_WIDTH / 2 - 20 - 10,
  height: SCREEN_WIDTH / 2 - 20 - 30,
  backgroundColor: 'transparent',
  position: 'absolute',
  top: -45
 },
 card: {
  marginBottom: 10,
  height: SCREEN_WIDTH / 2 - 20 - 90,
  backgroundColor: 'transparent',
  width: SCREEN_WIDTH / 2 - 20 -10
 },
 title: {
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center'
 },
 price: {
  fontSize: 20,
  color: 'orange',
  marginTop: 10
 }
})

export default ProductCard