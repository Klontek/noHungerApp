import React, { useRef, useState, useContext } from "react";

import { View, Text, StyleSheet, Dimension, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
// import { Icon } from "react-native-elements";

import { colors, parameters, title } from "../../global/styles";
import Header from "../../components/Header";
import { Button, Icon, SocialIcon } from "react-native-elements";

import { Formik } from "formik";
import { FIREBASE_AUTH } from "../../../db/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInContext } from "../../contexts/authContext";
import Toast from "react-native-toast-message";

export default function SignInScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);

  const [textInput2Focused, setTextInput2focused] = useState(false);
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  const auth = FIREBASE_AUTH;

  async function signIn(data) {
    try {
      const { email, password } = data;
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        // console.log({msg:'User Signed In', data:user});
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "User Signed In Successful",
        });
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `${error.code} ${error.message}`,
      });
      // alert(
      //   `Error: ${error.code}`,
      //   `Message: ${error.message}`
      // );
    }
  }

  return (
    <View style={styles.container}>
      <Header title="MY ACCOUNT" type="arrow-left" navigation={navigation} />

      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text style={title}>Sign-In</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.text1}>Please enter your email and password</Text>
        <Text style={styles.text1}>Register with your account</Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {(props) => (
          <View>
            <View style={{ marginTop: 20 }}>
              <View>
                <TextInput
                  style={styles.TextInput1}
                  placeholder="Email"
                  ref={textInput1}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
              </View>

              <View style={styles.TextInput2}>
                <Animatable.View
                  animation={textInput2Focused ? "" : "fadeInRight"}
                  duration={400}
                >
                  <Icon
                    name="lock"
                    iconStyle={{ color: colors.gray4 }}
                    type="material"
                    style={{ marginRight: 10 }}
                  />
                </Animatable.View>

                <TextInput
                  style={{ width: "80%" }}
                  placeholder="Password"
                  ref={textInput2}
                  secureTextEntry={true}
                  onFocus={() => {
                    setTextInput2focused(false);
                  }}
                  onBlur={() => {
                    setTextInput2focused(true);
                  }}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />

                <Animatable.View
                  animation={textInput2Focused ? "" : "fadeInLeft"}
                  duration={400}
                >
                  <Icon
                    name="visibility-off"
                    iconStyle={{ color: colors.gray4 }}
                    type="material"
                    style={{ marginRight: 10 }}
                  />
                </Animatable.View>
              </View>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 30 }}>
              <Button
                title="SIGN IN"
                buttonStyle={parameters.styledButton}
                titleStyle={parameters.buttonTitle}
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>

      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>
          Forgot Password?
        </Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "900" }}>OR</Text>
      </View>

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          style={styles.SocialIcon}
          onPress={() => {}}
        />
      </View>

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <SocialIcon
          title="Sign In With Google"
          button
          type="google"
          style={styles.SocialIcon}
          onPress={() => {}}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          marginLeft: 20,
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ ...styles.text1 }}>New on noHungerApp?</Text>
        <Button
          title="Create an Account"
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    color: colors.gray4,
    fontSize: 16,
  },
  TextInput1: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 15,
  },
  TextInput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: colors.borderColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
  },
  SocialIcon: {
    borderRadius: 12,
    height: 50,
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
  },
  createButtonTitle: {
    color: "#5C44AB",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
});
