import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Pressable, Dimensions } from "react-native";
import { Icon } from "react-native-elements";

export default function BusinessConsoleScreen() {
 return (
  <View style={styles.container}><Text>welcome to business Console</Text></View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 }
})