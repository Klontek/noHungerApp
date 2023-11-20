import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { colors, SIZES } from '../global/styles'

const Heading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <Text style={styles.headerTitle}>New Arrival</Text>
       <TouchableOpacity>
        <Icon
         name='apps'
         type='material'
         size={27}
        />
       </TouchableOpacity>
      </View>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
 container: {
  marginTop: SIZES.medium,
  marginHorizontal: 12,
 },
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between'
 },
 headerTitle: {
    color: colors.gray4,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
 }
})