// import React from "react";

// import { View, Text, StyleSheet, StatusBar } from "react-native";
// import { colors } from "./src/global/styles";
// import RootNavigator from "./src/navigation/rootNavigator";
// import Toast from "react-native-toast-message";

// // Redux
// import { Provider } from "react-redux";
// import { store } from "./store";

// //Context Api
// import Auth from "./src/contexts/store/Auth";

// export default function App() {
//   return (
//     <Auth>
//       <Provider store={store}>
//         <View style={styles.container}>
//           <StatusBar
//             barStyle="light-content"
//             backgroundColor={colors.statusBar}
//           />
//           <RootNavigator />
//           <Toast ref={(ref) => Toast.setRef(ref)} />
//         </View>
//       </Provider>
//     </Auth>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/rootNavigator";
import Toast from "react-native-toast-message";
import SplashScreen from "./src/components/SplashScreen";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Context Api
import Auth from "./src/contexts/store/Auth";

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 20 seconds
    const timeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 20000); // 20 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Auth>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.statusBar}
          />
          {/* Show SplashScreen if isSplashVisible is true, otherwise show RootNavigator */}
          {isSplashVisible ? <SplashScreen /> : <RootNavigator />}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
