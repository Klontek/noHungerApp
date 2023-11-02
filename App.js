import React from "react";

import {View, Text, StyleSheet, StatusBar} from "react-native";
import { SignInContextProvider } from "./src/contexts/authContext";
// import { NativeBaseProvider } from "native-base";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/rootNavigator";


// Redux
import {Provider} from 'react-redux'
import store from './store'

export default function App() {
  return (
      <Provider store={store}>
        <SignInContextProvider>
          <View style={styles.container}>
            <StatusBar
            barStyle="light-content"
            backgroundColor={colors.statusBar}
            />
            <RootNavigator/>

          </View>     
        </SignInContextProvider>
      </Provider>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})