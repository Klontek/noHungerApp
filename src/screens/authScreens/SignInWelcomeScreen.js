import React, { useRef, useState, useEffect, useContext } from "react";


import {View, Text, StyleSheet, Image} from "react-native";
import * as Animatable from "react-native-animatable"


import {colors, parameters, title} from "../../global/styles";
import Header from "../../components/Header";
import { Button, Icon, SocialIcon} from "react-native-elements";
import Swiper from "react-native-swiper";
// import {SignInContext} from "../../contexts/authContext"
// import{ FIREBASE_AUTH }from '../../../db/firestore'



export default function SignInWelcomeScreen({navigation}) {

  // const {dispatchSignedIn} = useContext(SignInContext);
  // const auth = FIREBASE_AUTH
  
  // side effect to persist users in the app even after quiting the app without signing out of the app
  // useEffect(() => {

  //   auth.onAuthStateChanged((user => {
  //     if(user) {
  //       dispatchSignedIn({type: "UPDATE_SIGN_IN", payload: {userToken: "signed-in"}});
  //     }else {
  //       dispatchSignedIn({type: "UPDATE_SIGN_IN", payload: {userToken: null}});  
  //     }
  //   }))


  // }, [])

 return (

  <View style={{flex: 1,}}>

  <View style={{
    flex:3, 
    justifyContent:"flex-start", alignItems:"center", paddingTop: 20}}>
   <Text style={{fontSize:26, color: colors.buttons, fontWeight: "bold"}}>Hungry?</Text>
    <Text style={{fontSize:26, color: colors.buttons, fontWeight: "bold"}}>Try noHungerApp Today</Text>
  </View>

  <View style={{flex: 4, justifyContent: "center"}}>

   <Swiper autoplay={true}>
    <View style={styles.slide1}>
     <Image
     source={require("../../../assets/images/eatable-foods/jollof_rice.jpeg")}
     style={{height: '100%', width: '100%'}}
     />
    </View>

    <View style={styles.slide2}>
     <Image
     source={require("../../../assets/images/eatable-foods/egusi_1.jpeg")}
     style={{height: '100%', width: '100%'}}
     />
    </View>

    <View style={styles.slide3}>
     <Image
     source={require("../../../assets/images/eatable-foods/fried_rice_chicken.jpeg")}
     style={{height: '100%', width: '100%'}}
     />
    </View>
   </Swiper>
  </View>

  <View style={{flex:4,marginBottom: 0}}>
      <View style={{marginHorizontal: 20, marginTop: 70}}>
       <Button
       title="SIGN IN"
       buttonStyle={parameters.styledButton}
       titleStyle={parameters.buttonTitle}
       onPress={() => {
        navigation.navigate("SignInScreen")
       }}
       />
      </View>

      <View style={{marginHorizontal: 20, marginTop: 30}}>
        <Button
        title="Create an Account"
        buttonStyle={styles.createButton}
        titleStyle={styles.createButtonTitle}
        onPress={() => {navigation.navigate('SignUpScreen')}}
        />
      </View>
  </View>

  </View>

 )
}

const styles = StyleSheet.create({
 slide1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.buttons,
 },
 slide2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.buttons
 },
 slide3: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.buttons
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