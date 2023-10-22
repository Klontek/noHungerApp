import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../global/styles'
import { Icon } from 'react-native-elements';
import { MenuData, specialData } from '../../../assets/Data/data';



const MenuScreen = ({navigation, shopData, onPress}) => {

//  const handlePress = () => { }
  return (
    <View style={styles.container}>

     {/* Special Offers */}
     <View>
      {
       specialData.map(item => 

           <View key={item.key} style={styles.view1}>

            <TouchableOpacity
              onPress={onPress}
            >
             <View style={styles.view2}>
              <Icon
                name="star"
                type="material-community"
                color="gold"
              />
              <Text style={styles.text1}>
               {item.title}
              </Text>

             </View>

            </TouchableOpacity>

           </View>
        )
      }

     </View>



     {/* =========Menu data===========*/}

     <View>
      {
       MenuData.map(item => 

           <View key={item.key} style={styles.view1}>

            <TouchableOpacity
              onPress={onPress}
            >
             <View style={styles.view2}>
              <Text style={styles.text1}>
               {item.title}
              </Text>

             </View>

            </TouchableOpacity>

           </View>
        )
      }

     </View>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
 container: {
  flex: 1,
  marginTop: 20
 },
 view1: {
  paddingHorizontal: 10
 },
 view2: {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  padding: 10,
  borderBottomColor:colors.gray4
 },
 text1: {
  color: colors.gray4,
  fontSize: 18,
  fontWeight: 'bold'
 }
})