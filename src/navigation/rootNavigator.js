import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {AuthStackFunction} from "./authNavigators";
import {AppStackFunction} from "./appStack";
import {SignInContext} from "../contexts/authContext"

export default function RootNavigator() {

 const {signedIn} = useContext(SignInContext)
 return(
  <NavigationContainer>

   {
    signedIn.userToken !== 'signed-in' ? (
     <AuthStackFunction/>
    ): (
     <AppStackFunction/>
    )
   }
   
  </NavigationContainer>
 )
}