import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { colors, parameters, title } from "../../global/styles";
import { Button, Icon, SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import AuthGlobal from "../../contexts/store/AuthGlobal";
import { loginUser } from "../../contexts/actions/Auth.action";
import * as Yup from "yup";
import FormSubmitButton from "../../components/AuthComponent/FormSubmitButton";
import Error from "../../components/AuthComponent/Error";
import Header from "../../components/Header";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required"),
});

const { height } = Dimensions.get("window");

export default function SignInScreen({ navigation }) {
  const context = useContext(AuthGlobal);
  const [userGoogleData, setUserGoogleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textInput2Focused, setTextInput2focused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "65304516459-ff1cogeil46ips3oqc7icaeendkb8j9r.apps.googleusercontent.com",
    webClientId:
      "65304516459-g1d0uo7quce3gsqiil4ifmtvt36bksb4.apps.googleusercontent.com",
    redirectUri: "https://nohungerapp.com",
  });

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("UserProfile");
    }
    handleSignInWithGoogle();
  }, [context.stateUser.isAuthenticated, response]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("jwt");
    if (!user) {
      if (response?.type === "success") {
        await getUserGoogleData(response.authentication.accessToken);
      }
    } else {
      setUserGoogleData(JSON.parse(user));
    }
  }

  const getUserGoogleData = async (token) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("jwt", JSON.stringify(user));
      setUserGoogleData(user);
    } catch (error) {
      console.log("Google login error", error.message);
    }
  };

  const SignIn = async (values, formikActions) => {
    setIsLoading(true);

    try {
      await validationSchema.validateSync(values, { abortEarly: false });

      loginUser(values, context.dispatch);

      // Move the toast notification inside the success block
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setIsLoading(false);

      Toast.show({
        topOffset: 60,
        type: "success",
        text1: `Login Successful`,
        text2: "",
      });
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `Please fill in your credentials`,
        text2: "",
      });

      setIsLoading(false);
    }
  };

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
                        secureTextEntry={!isPasswordVisible}
                        autoFocus={false}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        value={password}
                        error={touched.password && errors.password}
                      />

                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ position: "absolute", right: 10 }}
                      >
                        <Animatable.View
                          animation={textInput2Focused ? "" : "fadeInLeft"}
                          duration={400}
                        >
                          <Icon
                            name={
                              isPasswordVisible
                                ? "visibility-off"
                                : "visibility"
                            }
                            iconStyle={{ color: colors.gray4 }}
                            type="material"
                            style={{ marginRight: 10 }}
                          />
                        </Animatable.View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                  {isLoading ? (
                    <View
                      style={[styles.spinner, { backgroundColor: "#f2f2f2" }]}
                    >
                      <ActivityIndicator size="large" color="red" />
                    </View>
                  ) : (
                    <FormSubmitButton
                      title="Sign-in my account"
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                    />
                  )}
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
            onPress={() => promptAsync()}
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
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
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

// const { setLoginPending } = useLogin();
// const [error, setError] = useState("");
// const { email, password } = userInfo;

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

// const SignIn = (values, formikActions) => {
//   setIsLoading(true);
//   if (validationSchema) {
//     Toast.show({
//       topOffset: 60,
//       type: "error",
//       text1: `Please fill in your credentials`,
//       text2: "",
//     });
//   } else {
//     loginUser(values, context.dispatch);

//     Toast.show({
//       topOffset: 60,
//       type: "success",
//       text1: `Login Successful`,
//       text2: "",
//     });

//     formikActions.resetForm();
//     formikActions.setSubmitting(false);
//     setIsLoading(false);
//   }
// };
