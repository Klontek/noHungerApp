import React from "react";
import {  FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getShopData } from "../../assets/Data/data";
import ShopItemCard from "../components/ShopItemCard";




export const Route1 = ({navigation}) => {
  return (
  <View style={{flex: 1}}>
   <View style={styles.view2}>
    <FlatList
        style={{backgroundColor: 'white'}}
        data= {getShopData()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => navigation.navigate("PreferenceScreen", {index})}>
            <ShopItemCard
             productName={item.productData[0].name}
             image={item.productData[0].image}
             price={item.productData[0].price}
             productDetails={item.productData[0].description}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
    />
    <ShopItemCard/>
   </View>
  </View>
 )
}

export const Route2 = () => (<View style={styles.scene}/>)
export const Route3 = () => (<View style={styles.scene}/>)
export const Route4 = () => (<View style={styles.scene}/>)
export const Route5 = () => (<View style={styles.scene}/>)
export const Route6 = () => (<View style={styles.scene}/>)
export const Route7 = () => (<View style={styles.scene}/>)
export const Route8 = () => (<View style={styles.scene}/>)





const styles = StyleSheet.create({
 scene: {
  flex:1,
  backgroundColor: '#673ab7'
 },
 view2: {
  marginTop: 5,
  paddingBottom: 20
 },
 scene: {
  backgroundColor: '#673ab7'
 }
})