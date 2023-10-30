import { Image, ScrollView, StyleSheet, Text, View, Button} from 'react-native'
import React, {useState} from 'react'

export default function CategoriesRestaurantScreen({route}) {

 const [item, setItem] = useState(route.params.item);
 const [availability, setAvailability] = useState('')

  return (
  <View style={styles.container}>
   <ScrollView style={{marginBottom: 80, padding: 5}}>
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
   </ScrollView>
   

  </View>
  )
}

const styles = StyleSheet.create({
 container: {
  position: 'relative',
  height: '100%'
 },
 imageContainer: {
  backgroundColor: 'white',//colors.CardBackground,
  padding: 0,
  margin: 0
 },
 image: {
  width: "100%",
  height: 250
 }
})