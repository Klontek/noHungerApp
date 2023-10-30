import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function ProductList({ name, price, image, countInStock, navigation }) {

  return (
   <TouchableOpacity 
    style={{ width: '50%' }}
      onPress={() => 
        navigation.navigate("SingleProduct", { item: { name, price, image, countInStock } })
      }
   >
    <View style={{ width: SCREEN_WIDTH / 2, backgroundColor: 'white' }}>
     <ProductCard 
        name={name} 
        price={price} 
        image={image} 
        countInStock={countInStock}
     />
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
