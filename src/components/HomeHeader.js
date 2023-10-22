import React from "react";
import {Icon, withBadge} from "react-native-elements";
import { StyleSheet, View, Text, Image } from "react-native";

import {colors,parameters} from "../global/styles"

export default function HomeHeader({navigation}) {

 const BadgeIcon = withBadge(3)(Icon) 

 return (
  <View style={styles.header}>

   <View style={{alignItems:'center', marginLeft: 15, justifyContent: 'center'}}>
    <Icon
     type="material-community"
     name="menu"
     color={colors.CardBackground}
     size={32}
     onPress={() => {
      navigation.toggleDrawer()
     }}
    />
   </View>

   <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
    <Text style={{
     color: colors.CardBackground, fontSize: 25, 
     fontWeight: 'bold'}}>noHungerApp
     </Text>

   <View>
     <Image 
     style={styles.headerLogo}
     source={require('../../assets/noHungerLogo.png')}/>
   </View>
   </View>


   <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 18}}>
    <BadgeIcon
    type="material-community"
    name="basket"
    size={32}
    color={colors.CardBackground}
    />
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 header: {
  flexDirection: 'row',
  backgroundColor: colors.buttons,
  height: parameters.headerHeight,
  justifyContent: 'space-between'
 },
 headerLogo: {
  height:30, 
  width: 30, 
  marginHorizontal: 2, 
  marginVertical: 20
 }
})