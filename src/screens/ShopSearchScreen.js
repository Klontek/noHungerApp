import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground, Dimensions} from "react-native";
import { ListItem } from 'react-native-elements';
import { filterShopData } from '../../assets/Data/data';
import SearchComponent from '../components/SearchComponent';
import { colors } from '../global/styles';
// import { useNavigation } from '@react-navigation/native';




const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen({navigation}) {

  // const navigation = useNavigation()
  
  return (
    <View style={{marginBottom: 10, flex: 1}}>

     <SearchComponent/>

     <View style={{marginBottom: 10}}>

     <View>
      <FlatList
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      style={{}}
      data={filterShopData}
      keyExtractor={item =>item.id.toString()}
      renderItem={({item}) => {
        return (
        <TouchableWithoutFeedback
        onPress={() => (
          navigation.navigate('SearchResultScreen', {item: item.name})
        )}
        >
          <View style={styles.imageView}>
            <ImageBackground 
            style={styles.image}
            source={item.image}

            >
              <View style={styles.textView}>
                <Text style={{color: colors.CardBackground}}>{item.name}</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
        )
      }}
      ListHeaderComponent={<Text style={styles.listHeader}>Top Categories</Text>}
      ListFooterComponent={<Footer/>}
      />
     </View>

     </View>
    </View>
  )
}

const Footer = () => {
  return (
 <View style={{marginBottom: 30}}>

     <View>
      <FlatList
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      style={{}}
      data={filterShopData}
      keyExtractor={item =>item.id.toString()}
      renderItem={({item}) => {
        return (<TouchableWithoutFeedback
          onPress={() => (
          navigation.navigate('SearchResultScreen', {item: item.name})
        )}
        >
          <View style={styles.imageView}>
            <ImageBackground 
            style={styles.image}
            source={item.image}
            >
              <View style={styles.textView}>
                <Text style={{color: colors.CardBackground}}>{item.name}</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
        )
      }}
      ListHeaderComponent={<Text style={styles.listHeader}>More Categories</Text>}
      />
     </View>

     </View>
  )
}

const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4475,
    height: SCREEN_WIDTH * 0.4475,
    marginLeft: SCREEN_WIDTH * 0.035,
    marginBottom: SCREEN_WIDTH * 0.035
  },
  image: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    borderRadius: 10
  },
  listHeader: {
    fontSize: 16,
    color: colors.gray4,
    paddingBottom: 10,
    marginLeft: 12
  },
  textView: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)'
  }
})