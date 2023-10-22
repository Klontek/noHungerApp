import React from "react"

import {View, Text, StyleSheet, Dimension} from "react-native";
import {colors, parameters} from "../global/styles";
import { Icon } from "react-native-elements";

export default function Header({title, type, navigation}) {
 return (
  <View style={styles.header}>
   <View style={{marginLeft: 20}}>
    <Icon
    type="material-community"
    name={type}
    color={colors.headerText}
    size={28}
    onPress={() => {
      navigation.goBack()
    }}
    />
   </View>
    <View>
     <Text style={styles.textStyle}>{title}</Text>
    </View>
  </View>
 )
}

const styles = StyleSheet.create({
 header: {
  backgroundColor: colors.buttons,
  flexDirection: "row",
  height:parameters.headerHeight
 },
 textStyle: {
  color: colors.headerText,
  fontSize: 22,
  fontWeight: 'bold',
  marginLeft: 20,

 }
})