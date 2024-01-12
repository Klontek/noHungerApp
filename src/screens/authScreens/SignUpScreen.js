import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../global/styles";
import Header from "../../components/Header";
import { Button, Icon } from "react-native-elements";
import { Formik } from "formik";
import * as Animatable from "react-native-animatable";
// import { FIREBASE_AUTH } from "../../../db/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { Error } from "../../Shared/Error";

import axios from "axios";
import baseUrl from "../../../assets/Common/baseUrl";

const initialValues = {
  name: "",
  email: "",
  password: "",
  isAdmin: false,
  street: "",
  phone: "",
  city: "",
};

export default function SignUpScreen({ navigation }) {
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  // const auth = FIREBASE_AUTH;

  const handleSignUpError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email address is already taken";
      case "auth/invalid-email":
        return "Email is Invalid";
      default:
        return errorCode;
    }
  };

  // async function SignUp(values) {
  //   const { email, password } = values;

  //   try {
  //     const response = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     console.log("USER ACCOUNT CREATED");
  //     if (response) {
  //       Toast.show({
  //         topOffset: 60,
  //         type: "success",
  //         text1: "Registration Successful",
  //         text2: "Please login into your account",
  //       });
  //     }
  //     // Alert.alert('USER ACCOUNT CREATED')

  //     // Check authentication state
  //     const user = auth.currentUser;
  //     if (user) {
  //       // Alert.alert('User signed in');
  //       Toast.show({
  //         topOffset: 60,
  //         type: "success",
  //         text1: "User Signed in",
  //       });
  //     } else {
  //       // Alert.alert('User not signed in');
  //       Toast.show({
  //         topOffset: 60,
  //         type: "error",
  //         text1: "User not Signed in",
  //       });
  //     }
  //   } catch (error) {
  //     const errorMessage = handleSignUpError(error.code);
  //     // Alert.alert(errorMessage);
  //     Toast.show({
  //       topOffset: 60,
  //       type: "error",
  //       text1: "Invalid Entry",
  //       text2: "Please Fill in the form correctly"
  //     });
  //   }
  // }

  async function SignUp(values) {
    try {
      const response = await axios.post(`${baseUrl}users/register`, values);
      console.log("USER ACCOUNT CREATED", response.data);

      if (response.status === 201) {
        navigation.navigate("SignInScreen");
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Registration Successful",
          text2: "Please log in to your account",
        });
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Signup Failed",
          text2: "Unexpected response status",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        // The request was made, but the server responded with a non-2xx status
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Server response data:", error.response.data);

        const errorMessage = handleSignUpError(error.response.data);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Signup Failed",
          text2: errorMessage,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Signup Failed",
          text2: "No response received from the server",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Signup Failed",
          text2: "Error setting up the request",
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header title="MY ACCOUNT" type="arrow-left" navigation={navigation} />

      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.view1}>
          <Text style={styles.text1}>Sign-up</Text>
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) =>
            // console.log("Form submitted with values:", values)
            SignUp(values)
          }
        >
          {(props) => (
            <View style={styles.view2}>
              <View>
                <Text style={styles.text2}>New on noHungerApp ?</Text>
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Firstname"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Lastname"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("lastName")}
                  value={props.values.lastName}
                />
              </View>

              {/* email field */}
              <View style={styles.view10}>
                <View>
                  <Icon
                    name="email"
                    type="material"
                    color={colors.gray4}
                    style={styles.email}
                  />
                </View>
                <View style={styles.view11}>
                  <TextInput
                    placeholder="Email"
                    style={{ ...styles.input4, flex: 1, padding: 10 }}
                    autoFocus={false}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                  />
                </View>
              </View>

              {/* password field */}
              <View style={styles.view14}>
                <Animatable.View
                  animation={passwordFocused ? "fadeInRight" : "fadeInLeft"}
                  duration={400}
                >
                  <Icon
                    name="lock"
                    color={colors.gray4}
                    type="material"
                    style={{ marginRight: 10 }}
                  />
                </Animatable.View>
                <TextInput
                  placeholder="Password"
                  style={{ ...styles.input4, flex: 1, padding: 10 }}
                  autoFocus={false}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={true}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordBlurred(true)}
                />
                <Animatable.View
                  animation={passwordBlurred ? "fadeInLeft" : "fadeInRight"}
                  duration={400}
                >
                  <Icon
                    name="visibility"
                    color={colors.gray4}
                    type="material"
                    style={{ marginRight: 10 }}
                  />
                </Animatable.View>
              </View>

              <View style={styles.view10}>
                <View style={styles.view11}>
                  <TextInput
                    placeholder="Address"
                    style={{ ...styles.input4, flex: 1, padding: 10 }}
                    autoFocus={false}
                    onChangeText={props.handleChange("street")}
                    value={props.values.street}
                  />
                </View>
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input1}
                  keyboardType="number-pad"
                  autoFocus={true}
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                />
              </View>

              {/* city */}
              <View style={styles.view10}>
                <View style={styles.view11}>
                  <TextInput
                    placeholder="City"
                    style={{ ...styles.input4, flex: 1, padding: 10 }}
                    autoFocus={false}
                    onChangeText={props.handleChange("city")}
                    value={props.values.city}
                  />
                </View>
              </View>

              <View style={styles.view15}>
                <Text style={styles.text3}>
                  By Creating or loging into an account you are
                </Text>
                <View style={styles.view16}>
                  <Text style={styles.text3}>agreeing with our </Text>
                  <Text style={styles.text4}>Terms & Conditions</Text>
                  <Text style={styles.text3}>and</Text>
                </View>
                <Text style={styles.text4}>Privacy Statement</Text>
              </View>

              <View style={styles.view17}>
                <View>{error ? <Error message={error} /> : null}</View>
                <Button
                  title="Create my account"
                  buttonStyle={styles.button1}
                  titleStyle={styles.title1}
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.view18}>
          <Text style={styles.text5}>OR</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text6}>
              Already have an account with noHungerApp ?
            </Text>
          </View>
          <View style={styles.view21}>
            <Button
              title="Sign-In"
              buttonStyle={styles.button2}
              titleStyle={styles.title2}
              onPress={() => navigation.navigate("SignInScreen")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view1: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 22,
    color: colors.black,
    fontWeight: "bold",
    color: colors.buttons,
  },
  view2: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  view3: {
    marginTop: 5,
    marginBottom: 10,
  },
  text2: {
    fontSize: 15,
    color: colors.black,
  },
  view4: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 12,
    paddingLeft: 5,
  },
  view5: {
    marginLeft: 30,
    marginTop: 20,
    // maxWidth: '65%'
  },
  input1: {
    fontSize: 16,
  },
  view6: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  view7: {
    marginLeft: 0,
    maxWidth: "65%",
  },
  input2: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
  },
  view8: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 12,
    paddingLeft: 5,
    marginBottom: 20,
    height: 48,
  },
  view9: {
    marginLeft: 0,
    maxWidth: "65%",
  },
  input3: {
    fontSize: 16,
    marginLeft: 0,
    marginBottom: 0,
  },
  view10: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  view11: {
    marginLeft: 30,
    maxWidth: "65%",
  },
  input4: {
    fontSize: 16,
    marginLeft: -20,
    // marginBottom: -15
  },
  view13: {
    flexDirection: "row",
    height: 40,
  },
  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginTop: 20,
  },
  view15: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text3: {
    fontSize: 13,
  },
  view16: {
    flexDirection: "row",
  },
  text4: {
    textDecorationLine: "underline",
    color: "green",
    fontSize: 13,
  },
  button1: {
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
  title1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  view17: {
    marginVertical: 10,
    marginTop: 30,
  },
  view18: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },
  text5: {
    fontSize: 15,
    fontWeight: "bold",
  },
  view19: {
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  view20: {
    marginTop: 5,
  },
  view21: {
    marginTop: 5,
    alignItems: "flex-end",
  },
  button2: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.background2,
    height: 40,
    paddingHorizontal: 20,
  },
  title2: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
