import React, { useRef, useState, useContext, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimension,
  TextInput,
  Touchable,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { colors, parameters, title } from "../../global/styles";
import Header from "../../components/Header";
import { Button, Icon, SocialIcon } from "react-native-elements";

import { Formik } from "formik";
import Toast from "react-native-toast-message";

// Context
import AuthGlobal from "../../contexts/store/AuthGlobal";
import { loginUser } from "../../contexts/actions/Auth.action";

import * as Yup from "yup";
import FormSubmitButton from "../../components/AuthComponent/FormSubmitButton";
import Error from "../../components/AuthComponent/Error";
import axios from "axios";
import baseUrl from "../../../assets/Common/baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppLoader from "../../components/AppLoader";
import { signIn } from "../../../assets/Common/user";
// import { useLogin } from "../../contexts/LoginProvider";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("password is required!"),
});

export default function SignInScreen({ navigation }) {
  // const { setIsLoggedIn, setProfile } = useLogin();
  const context = useContext(AuthGlobal);
  const [textInput2Focused, setTextInput2focused] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  // const { setLoginPending } = useLogin();
  // const [error, setError] = useState("");
  // const { email, password } = userInfo;

  async function SignIn(values, formikActions) {
    // setLoginPending(true);

    try {
      // console.log("Request Payload:", { email, password });
      // const response = await signIn(userInfo.email, userInfo.password);

      const response = await loginUser({ ...values }, context.dispatch);
      console.log("USER LOGGED IN", response);

      if (response && response.status === 201 && response.data.success) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `Welcome ${response.data.name}`,
          text2: "Please log in to your account",
        });
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        // setLoginPending(false);
      }
    } catch (error) {
      console.error("Error in SignInScreen:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // The request was made, but the server responded with a non-2xx status
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        errorMessage =
          "Invalid credentials. Please check your email and password.";
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        errorMessage =
          "No response received from the server. Please try again.";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      // Toast.show({
      //   topOffset: 60,
      //   type: "error",
      //   text1: "Sign-In Failed",
      //   text2: errorMessage,
      // });
    } finally {
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      // setLoginPending(false);
    }
  }

  return (
    <>
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
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={SignIn}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const { email, password } = values;
            return (
              <View>
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Email/Username</Text>
                      {touched.name && errors.name && (
                        <Error message={errors.name} />
                      )}
                    </View>
                    <View>
                      <TextInput
                        style={styles.TextInput1}
                        placeholder="Email"
                        // ref={textInput1}
                        onChangeText={handleChange("email")}
                        autoFocus={false}
                        value={email}
                        error={touched.email && errors.email}
                        onBlur={handleBlur("email")}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Password</Text>
                      {touched.password && errors.password && (
                        <Error message={errors.password} />
                      )}
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
                        placeholder="********"
                        // ref={textInput2}
                        secureTextEntry={true}
                        autoFocus={false}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        value={password}
                        error={touched.password && errors.password}
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
                </View>

                {/* <View>{error ? <Error message={error} /> : null}</View> */}

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                  <FormSubmitButton
                    title="Sign-in my account"
                    onPress={handleSubmit}
                    submitting={isSubmitting}
                  />
                </View>
              </View>
            );
          }}
        </Formik>

        <View style={{ alignItems: "center", marginTop: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
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
    </>
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
  fieldLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: 25,
  },
});

// LOG  USER LOGGED IN undefined
//  ERROR  SignIn Error: [TypeError: Cannot read property 'success' of undefined]
//  ERROR  Error setting up the request: Cannot read property 'success' of undefined

// // from Context
// const context = useContext(AuthGlobal);

// const [textInput2Focused, setTextInput2focused] = useState(false);
// const textInput1 = useRef(1);
// const textInput2 = useRef(2);
// const [error, setError] = useState("");

// // useEffect for Context
// useEffect(() => {
//   if (context.stateUser.isAuthenticated === true) {
//     props.navigation.navigate("UserProfile");
//   }
// }, [context.stateUser.isAuthenticated]);

// async function signIn(data) {
//   try {
//     const { email, password } = data;

//     if (email === "" || password === "") {
//       setError("please fill in your credentials");
//     } else {
//       loginUser(data, context.dispatch);
//       Toast.show({
//         topOffset: 50,
//         type: "success",
//         text1: `User Signed In`,
//         text2: "Loading...",
//       });
//     }
//   } catch (error) {
//     Toast.show({
//       topOffset: 50,
//       type: "error",
//       text1: `Invalid entry`,
//       text2: "Please Fill in the form correctly",
//     });
//   }
// }
