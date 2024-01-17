import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";

const FormCover = ({ initialValues, onSubmit, children }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>{children(props)}</View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});

export default FormCover;

// import React from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// const FormCover = ({ children }) => {
//   return (
//     <KeyboardAvoidingView
//       enabled
//       behavior={Platform.OS === "ios" ? "padding" : null}
//       style={styles.container}
//     >
//       {children}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: Dimensions.get("window").width,
//     paddingHorizontal: 20,
//   },
// });

// export default FormCover;
