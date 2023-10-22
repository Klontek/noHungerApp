import React from 'react'
import {View, Text, StyleSheet} from "react-native";

export default function MyOrdersScreen() {
  return (
    <View style={styles.order}>
      <Text>My Order Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  order: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})