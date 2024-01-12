import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { colors } from "../../global/styles";
import CustomHeader from "../../components/CustomHeader";

const RegisterBusinessScreen = ({ navigation }) => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Registration Successful",
      text2: "Your business details have been submitted.",
    });
  };

  return (
    <>
      <CustomHeader onPressBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.header}>Business Registration</Text>
        <Formik
          initialValues={{
            businessName: "",
            ownerName: "",
            email: "",
            phone: "",
            address: "",
          }}
          onSubmit={(values) => {
            // Handle form submission logic here
            console.log("Form Values:", values);
            showToast();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("businessName")}
                onBlur={handleBlur("businessName")}
                value={values.businessName}
                placeholder="Business Name"
              />

              <TextInput
                style={styles.input}
                onChangeText={handleChange("ownerName")}
                onBlur={handleBlur("ownerName")}
                value={values.ownerName}
                placeholder="Owner Name"
              />

              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                placeholder="Phone"
                keyboardType="phone-pad"
              />

              <TextInput
                style={styles.input}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                placeholder="Address"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
  },
  button: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RegisterBusinessScreen;

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import MultiStepper from "../../components/multiStepper";

// const RegisterBusinessScreen = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* Use the MultiStepper component */}
//       <MultiStepper />
//     </View>
//   );
// };

// export default RegisterBusinessScreen;

// // const styles = StyleSheet.create({})
