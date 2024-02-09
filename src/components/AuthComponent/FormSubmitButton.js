// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import React from "react";
// import { colors } from "../../global/styles";

// const FormSubmitButton = ({ title, onPress, submitting }) => {
//   const backgroundColor = submitting ? "#bdb4dd" : "#5C44AB";

//   return (
//     <TouchableOpacity
//       onPress={!submitting ? onPress : null}
//       style={[styles.container, { backgroundColor }]}
//     >
//       {submitting ? (
//         <ActivityIndicator color="white" />
//       ) : (
//         <Text style={styles.title}>{title}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default FormSubmitButton;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.buttons,
//     alignContent: "center",
//     justifyContent: "center",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.buttons,
//     height: 50,
//     paddingHorizontal: 20,
//     width: "100%",
//   },
//   view17: {
//     marginVertical: 10,
//     marginTop: 30,
//   },
//   title: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: -3,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../global/styles";

const FormSubmitButton = ({ title, onPress, submitting }) => {
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const backgroundColor = submitting ? "#bdb4dd" : "#5C44AB";

  useEffect(() => {
    if (submitting) {
      const timeout = setTimeout(() => {
        setLoadingTimeout(null);
      }, 10000); // Set a timeout of 5 seconds for the spinner
      setLoadingTimeout(timeout);
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [submitting]);

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      {submitting ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color="white" />
          <Text style={styles.loadingText}>Signing in...</Text>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttons,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  spinnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginLeft: 10,
  },
});
