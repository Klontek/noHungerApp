import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Pressable, Dimensions } from "react-native";
import { Icon, Button } from "react-native-elements";


export default function BusinessConsoleScreen() {
  const navigation = useNavigation();
 return (
  <View style={styles.container}>
   <Icon
     type="material-community"
     name="home-group-plus"
     size={50}
   />
   <Text>Not Registered Yet</Text>
   <Text>Register with us Today!</Text>
      <View style={{marginHorizontal: 20, marginTop: 30}}>
        <Button
        title="SET UP YOUR BUSINESS"
        buttonStyle={styles.createButton}
        titleStyle={styles.createButtonTitle}
        onPress={() => {navigation.navigate('RegisterBusinessScreen')}}
        />
      </View>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
 createButton: {
  backgroundColor: "white",
  alignContent: "center",
  justifyContent: "center",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#5C44AB",
  paddingHorizontal: 20,
  minWidth: 150, 
  paddingVertical: 10,
  height: 50
},
createButtonTitle: {
  color: "gray",
  fontSize: 20,
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 0, 
}
})