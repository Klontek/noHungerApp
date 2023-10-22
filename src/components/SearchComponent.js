import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, FlatList, TouchableOpacity, Keyboard} from "react-native";
import * as Animatable from 'react-native-animatable'
import {useNavigation} from "@react-navigation/native"
import { Icon } from "react-native-elements";

import { colors } from "../global/styles";
import { filterShopData } from "../../assets/Data/data";
import filter from 'lodash/filter'





export default function SearchComponent() {

  const [data, setData] = useState([...filterShopData])
 const [modalVisible, setModalVisible] = useState(false);
 const [textInputFocused, setTextInputFocused] = useState(true);
 const textInput = useRef(0)
 const navigation = useNavigation();

// function to filter data
 const contains = ({name}, query) => {
  if(name.includes(query)) {
    return true
  }
  return false
 }

 //function to handle search
 const handleSearch = (text) => {
  const dataSearch = filter(filterShopData, (userSearch) => {
    return contains(userSearch, text)
  })
  setData([...dataSearch])
 }


 return (
  <View style={{alignItems: 'center'}}>

   <TouchableWithoutFeedback
   onPress={() => {
    setModalVisible(true)
   }}
   >
    <View style={styles.searchArea}>
     <Icon
       name="search"
       style={styles.container}
       type='material'
       iconStyle={{marginLeft: 5, marginVertical: 10}}
       size={27}
     />
     <Text style={{fontSize: 15, marginLeft: 5, marginTop: 5}}>Hungry, what do want...?</Text>
    </View>
    
   </TouchableWithoutFeedback>

   <Modal
   animationType="fade"
   transparent={false}
   visible={modalVisible}
   >
    <View style={styles.modal}>
      <View style={styles.view1}>
        <View style={styles.textInput}>
          <Animatable.View
          animation = {textInputFocused ? 'fadeInRight' : 'fadeInLeft'}
          duration={400}
          >
            <Icon
              name={textInputFocused ? 'arrow-back': 'search'}
              onPress={() => {
                if(textInputFocused)
                setModalVisible(false)
                setTextInputFocused(true)
              }}
              type='material'
              style={styles.icon2}
              iconStyle={{marginRight: 5}}
            />
          </Animatable.View>

          <TextInput
          style={{width: '90%', marginVertical: 10}}
          placeholder=""
          autoFocus={false}
          ref={textInput}
          onFocus = {() => setTextInputFocused(true)}
          onBlur = {() => setTextInputFocused(false)}
          onChangeText = {(text) => handleSearch(text)}
          />

          <Animatable.View
          animation = {textInputFocused ? 'fadeInLeft' : ''}
          duration={400}
          >
            <Icon
              name={textInputFocused ? 'cancel': null}
              style={{marginRight: 10}}
              iconStyle={{color: colors.gray4}}
              onPress={() => {
                textInput.current.clear()
                // handleSearch()
              }}
            />
          </Animatable.View>

        </View>

      </View>

      <FlatList
      data={data}
      renderItem={({item}) => (
            <TouchableOpacity
                onPress={() => {
                navigation.navigate("SearchResultScreen", { item: item.name });
                  setModalVisible(false)
                  setTextInputFocused(false)
                  // navigation.navigate('ShopDetail', {id: item.id})
                }}
            >
              <View style={styles.view2}>
                <Text style={{color: colors.gray4, fontSize: 15}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      />
    
    </View>
   </Modal>

  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  color: colors.gray8
 },
 text1: {
  color: colors.gray4,
  fontSize: 16
 },
 textInput: {
  borderWidth: 1,
  borderRadius: 12,
  marginHorizontal: 0,
  borderColor: "#86939e",
  flexDirection: "row",
  justifyContent: 'space-evenly',
  alignItems: 'center',
  alignContent: 'center',
  paddingLeft: 10,
  paddingRight: 10
 },
 searchArea: {
  marginTop: 10,
  width: "94%",
  height: 50,
  backgroundColor: colors.CardBackground,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.gray6,
  flexDirection: 'row',
  alignItems: "center"
 },
 searchIcon: {
  fontSize: 24,
  padding: 5,
  color: colors.gray4
 },
 view1: {
  height: 70,
  justifyContent: 'center',
  paddingHorizontal: 10,
 },
 view2: {
  flexDirection: 'row',
  padding: 15,
  alignItems: 'center'
 },
 icon2: {
  fontSize: 24,
  padding: 5,
  color: colors.gray4
 },
 modal: {
  flex:1
 }
})