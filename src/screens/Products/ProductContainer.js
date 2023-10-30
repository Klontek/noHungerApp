import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react';
import { getShopData } from '../../../assets/Data/data';
import ProductList from './ProductList';

const data = getShopData()

const ProductContainer = () => {

 const [products, setProducts] = useState([])

 useEffect(() => {
  setProducts(data);
  return () => {
   setProducts([])
  }
 }, [])
  return (
    <View>
      <Text>ProductContainer</Text>
      <FlatList
       horizontal
       data={products}
       renderItem={(item) => {<ProductList/>}}
      />
    </View>
  )
}

export default ProductContainer

const styles = StyleSheet.create({})