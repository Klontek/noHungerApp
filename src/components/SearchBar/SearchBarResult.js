import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import React from 'react'
import SearchResultCard from '../components/SearchResultCard';
import { getShopData } from '../../assets/Data/data';
import { colors } from '../global/styles';
// import {useNavigation } from "@react-navigation/native"



const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResultScreen = ({navigation, route}) => {

  // const navigation = useNavigation()

  return (
    <View style={styles.container}>

     <View>
        <FlatList
          style={{backgroundColor: colors.CardBackground}}
          data={getShopData()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SearchResultCard
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
              <Text style={styles.listHeader}>{getShopData().length} Search result for {route.params.item}</Text>
            </View>
          }
        />
     </View>

    </View>
  )
}

export default SearchResultScreen;

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