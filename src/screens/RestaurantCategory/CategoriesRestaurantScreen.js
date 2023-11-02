import { Image, ScrollView, StyleSheet, Text, View, Button, FlatList, Dimensions} from 'react-native'
import React, {useState} from 'react'
import RestaurantCategoryCard from './RestaurantCategoryCard';
import { getShopData } from '../../../assets/Data/data';
// import { colors } from '../../global/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CategoriesRestaurantScreen({navigation, route}) {

//  const [item, setItem] = useState(route.params.item);
//  const [availability, setAvailability] = useState('')

  return (
  <View style={styles.container}>

        <FlatList
          style={{backgroundColor: 'white'}}
          data={getShopData()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RestaurantCategoryCard
               screenWidth={SCREEN_WIDTH}
               images={item.images}
               ratings={item.rating}
               numReviews={item.numReviews}
               ShopName={item.ShopName}
               farAway={item.farAway}
               businessAddress={item.businessAddress}
               productData={item.productData}
               OnPressShopCard={() => (navigation.navigate("ShopHomeScreen", {id: index, shop: item.ShopName}))}
            />
          )}
          ListHeaderComponent ={
            <View>
              <Text style={styles.listHeader}> Food Category for {route.params.item}</Text>
            </View>
          }
        />

  
   {/* <ScrollView style={{marginBottom: 80, padding: 5}}>
    <View style={styles.imageContainer}>
     <Image
      source={item.images}
      //  source={{
      //   uri: item.image ? item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
      //  }}
       resizeMode="contain"
       style={styles.image}
     />
    </View>
   </ScrollView> */}
   

  </View>
  )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 listHeader: {
  fontSize: 20,
  paddingHorizontal: 10,
  paddingVertical: 15,
  fontWeight: 'bold',
  color: 'black'
 }
})

// const styles = StyleSheet.create({
//  container: {
//   position: 'relative',
//   height: '100%'
//  },
//  imageContainer: {
//   backgroundColor: 'white',//colors.CardBackground,
//   padding: 0,
//   margin: 0
//  },
//  image: {
//   width: "100%",
//   height: 250
//  }
// })