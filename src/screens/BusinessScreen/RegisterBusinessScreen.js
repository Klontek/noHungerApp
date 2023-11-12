import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MultiStepper from '../../components/multiStepper'

const RegisterBusinessScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Use the MultiStepper component */}
      <MultiStepper />
    </View>
  )
}

export default RegisterBusinessScreen

const styles = StyleSheet.create({})