import React from "react";

import { View, Text, StyleSheet, StatusBar } from "react-native";
import { SignInContextProvider } from "./src/contexts/authContext";
// import { NativeBaseProvider } from "native-base";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/rootNavigator";
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

//Context Api
import Auth from "./src/contexts/store/Auth";

export default function App() {
  return (
    <Provider store={store}>
      <SignInContextProvider>
        <Auth>
          <View style={styles.container}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.statusBar}
            />
            <RootNavigator />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </View>
        </Auth>
      </SignInContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
