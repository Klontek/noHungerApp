import { useNavigation } from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Dimensions,
} from 'react-native';
// import { Icon, Input, SearchBar } from 'react-native-elements';
import { getShopData } from '../../../assets/Data/data';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListItem from './ListItem';


// import { useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
// import baseURL from '../../assets/common/baseUrl'
// import AsyncStorage from '@react-native-community/async-storage'


// ProductHeader

const ListHeader = () => {
  return (
    <View
      elevation={1}
      style={styles.listHeader}
    >
      <View style={styles.headerItem}>
        <Text style={{fontWeight: 600}}>Image</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: 600}}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: 600}}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: 600}}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: 600}}>Price</Text>
      </View>
    </View>
  )
}



const {height, width} = Dimensions.get('window')


const Products = () => {
const data = getShopData()
const [Search, setSearch] = useState('')
const navigation = useNavigation()

const updateSearch = () => {
  return
}
 // const [ProductList, setProductList] = useState();
 // const [productFilter, setProductFilter] = useState();
//  const [loading, setLoading] = useState(true);
 // const [token, setToken] = useState();

 // useFocusEffect(
 //  useCallback(
 //   () => {
 //    // Get Token
 //    AsyncStorage.getItem("jwt").then((res) => {
 //     setToken(res).catch((error) => console.log(error))
 //    })

 //    axios.get(`${baseURL}products`),then((res) => {
 //     setProductList(res.data)
 //     setProductFilter(res.data);
 //     setLoading(false)
 //    })

 //    return () => {
 //     setProductList()
 //     setProductFilter()
 //     setLoading(true)
 //    }
 //   },[]
 //  )
 // )
  return (
    <View>
      <View>
        <SearchBar/>
      </View>

       <FlatList
        data={data}
        ListHeaderComponent={ListHeader}
        keyExtractor={item =>item.id.$oid.toString()}
        renderItem={({item, index}) => (
          <ListItem
              brand= {item.productData[0].brand}
              itemName= {item.productData[0].name}
              categoryName={item.productData[0].category.name}
              price={item.productData[0].price}
              image={item.productData[0].image}
              description={item.productData[0].description}
              navigation={navigation}
              index={index}
              {...item}
          />
        )}
       
       />

      {/* {loading ? (
       <View>
        <ActivityIndicator style={styles.spinner} size="large" color="red"/>
       </View>
      ): (
       <FlatList
        data={data}
        renderItem={({item, index}) => {
         <Text>{item.productData[0].name}</Text>
        }}
        keyExtractor={item => item.id.$oid}
       />
      )} */}
    </View>
  )
}


const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 3,
    width: width / 6
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Products

