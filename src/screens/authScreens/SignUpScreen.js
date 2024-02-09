import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../global/styles";
import Header from "../../components/Header";
import { Button, Icon } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
// import { Error } from "../../Shared/Error";

import axios from "axios";
import baseUrl from "../../../assets/Common/baseUrl";
import FormSubmitButton from "../../components/AuthComponent/FormSubmitButton";
import Error from "../../components/AuthComponent/Error";
// import { StackActions } from "@react-navigation/native";
// import AppLoader from "../../components/AppLoader";
// import { signIn } from "../../../assets/Common/user";
import AuthGlobal from "../../contexts/store/AuthGlobal";
import { ActivityIndicator } from "react-native-paper";
// import AuthContext from "../../contexts/store/Auth";
// import { useLogin } from "../../contexts/LoginProvider";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password doesn't match"
  ),
  street: Yup.string().trim().required("Address name is required!"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  city: Yup.string().trim().required("City name is required!"),
});

const userInfo = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false,
  street: "",
  phone: "",
  city: "",
};

const { height } = Dimensions.get("window");

export default function SignUpScreen({ navigation }) {
  const context = useContext(AuthGlobal);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [textInput2Focused, setTextInput2focused] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  async function SignUp(values, formikActions) {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await axios.post(`${baseUrl}users/register`, values);
      console.log("response from server", response);

      if (response.status === 200 || response.status === 201) {
        navigation.navigate("SignInScreen");
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Registration Successful",
          text2: "Please log in to your account",
        });

        console.log("USER ACCOUNT CREATED", response.data);

        formikActions.resetForm();
        formikActions.setSubmitting(false);
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
    } finally {
      setIsLoading(false);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      // setLoginPending(false);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Header title="MY ACCOUNT" type="arrow-left" navigation={navigation} />

        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.view1}>
            <Text style={styles.text1}>Sign-up</Text>
          </View>

          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={SignUp}
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
              const {
                name,
                email,
                password,
                confirmPassword,
                street,
                phone,
                city,
              } = values;
              return (
                <View style={styles.view2}>
                  <View>
                    <Text style={styles.text2}>New on noHungerApp ?</Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Full Name</Text>
                      {touched.name && errors.name && (
                        <Error message={errors.name} />
                      )}
                    </View>
                    <View style={styles.view6}>
                      <TextInput
                        placeholder="Full Name"
                        style={styles.input1}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={name}
                      />
                    </View>
                  </View>

                  {/* email field */}
                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Email</Text>
                      {touched.email && errors.email && (
                        <Error message={errors.email} />
                      )}
                    </View>

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
                          onChangeText={handleChange("email")}
                          error={touched.email && errors.email}
                          value={email}
                          onBlur={handleBlur("email")}
                        />
                      </View>
                    </View>
                  </View>

                  {/* password field */}

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Password</Text>
                      {touched.password && errors.password && (
                        <Error message={errors.password} />
                      )}
                    </View>

                    <View style={styles.view14}>
                      <Animatable.View animation="fadeInRight" duration={400}>
                        <Icon
                          name="lock"
                          color={colors.gray4}
                          type="material"
                          style={{ marginRight: 10 }}
                        />
                      </Animatable.View>
                      <TextInput
                        placeholder="********"
                        style={{ ...styles.input4, flex: 1, padding: 10 }}
                        autoFocus={false}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={touched.password && errors.password}
                        value={password}
                        secureTextEntry={!isPasswordVisible}
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

                  {/* Confirm Password */}

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Confirm Password</Text>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Error message={errors.confirmPassword} />
                      )}
                    </View>

                    <View style={styles.view14}>
                      <Animatable.View animation="fadeInRight" duration={400}>
                        <Icon
                          name="lock"
                          color={colors.gray4}
                          type="material"
                          style={{ marginRight: 10 }}
                        />
                      </Animatable.View>
                      <TextInput
                        placeholder="********"
                        style={{ ...styles.input4, flex: 1, padding: 10 }}
                        autoFocus={false}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        value={confirmPassword}
                        secureTextEntry={!isPasswordVisible}
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

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Address</Text>
                      {touched.street && errors.street && (
                        <Error message={errors.street} />
                      )}
                    </View>

                    <View style={styles.view10}>
                      <View style={styles.view11}>
                        <TextInput
                          placeholder="Street address"
                          style={{ ...styles.input4, flex: 1, padding: 10 }}
                          autoFocus={false}
                          onChangeText={handleChange("street")}
                          error={touched.street && errors.street}
                          value={street}
                          onBlur={handleBlur("street")}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>Phone</Text>
                      {touched.phone && errors.phone && (
                        <Error message={errors.phone} />
                      )}
                    </View>

                    <View style={styles.view6}>
                      <TextInput
                        placeholder="Phone Number"
                        style={styles.input1}
                        keyboardType="number-pad"
                        autoFocus={true}
                        onChangeText={handleChange("phone")}
                        error={touched.phone && errors.phone}
                        value={phone}
                        onBlur={handleBlur("phone")}
                      />
                    </View>
                  </View>

                  {/* city */}

                  <View style={{ flexDirection: "column" }}>
                    <View style={styles.fieldLabelContainer}>
                      <Text>City</Text>
                      {touched.city && errors.city && (
                        <Error message={errors.city} />
                      )}
                    </View>

                    <View style={styles.view10}>
                      <View style={styles.view11}>
                        <TextInput
                          placeholder="City"
                          style={{ ...styles.input4, flex: 1, padding: 10 }}
                          autoFocus={false}
                          onChangeText={handleChange("city")}
                          error={touched.city && errors.city}
                          value={city}
                          onBlur={handleBlur("city")}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.view15}>
                    <Text style={styles.text3}>
                      By Creating or logging into an account you are
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("PrivacyPolicy")}
                    >
                      <View style={styles.view16}>
                        <Text style={styles.text3}>agreeing with our </Text>
                        <Text style={styles.text4}>Terms & Conditions</Text>
                        <Text style={styles.text3}>and</Text>
                      </View>

                      <Text style={styles.text4}>Privacy Statement</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.view17}>
                    {isLoading ? (
                      // <AppLoader />
                      <View
                        style={[styles.spinner, { backgroundColor: "#f2f2f2" }]}
                      >
                        <ActivityIndicator size="large" color="red" />
                      </View>
                    ) : (
                      <FormSubmitButton
                        title="Create my account"
                        onPress={handleSubmit}
                        submitting={isSubmitting}
                      />
                    )}
                  </View>
                </View>
              );
            }}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
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
  fieldLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -6,
    marginTop: 20,
  },
});

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

// setLoginPending(true);
// try {
//   const response = await axios.post(`${baseUrl}users/register`, values);
//   console.log("USER ACCOUNT CREATED", response.data);

//   if (response.status === 201 || response.data.success) {
//     // navigation.navigate("ImageUpload");

//     const signInResponse = await signIn({
//       values: email,
//       values: password,
//     });

//     console.log(signInResponse);
//     if (signInResponse.data.success) {
//       navigation.dispatch(
//         StackActions.replace("ImageUpload", {
//           token: signInResponse.data.token,
//         })
//       );
//     }

//     Toast.show({
//       topOffset: 60,
//       type: "success",
//       text1: "Registration Successful",
//       text2: "Please log in to your account",
//     });

//     formikActions.resetForm();
//     formikActions.setSubmitting(false);
//     // setLoginPending(false);
//   } else {
//     // Handle unexpected response status
//     console.error("Unexpected response status:", response.status);
//     Toast.show({
//       topOffset: 60,
//       type: "error",
//       text1: "Signup Failed",
//       text2: "Unexpected response status",
//     });
//   }
// } catch (error) {
//   console.error("Signup Error:", error);

//   if (error.response) {
//     // The request was made, but the server responded with a non-2xx status
//     console.error(
//       "Server responded with error status:",
//       error.response.status
//     );
//     console.error("Server response data:", error.response.data);

//     const errorMessage = handleSignUpError(error.response.data);
//     Toast.show({
//       topOffset: 60,
//       type: "error",
//       text1: "Signup Failed",
//       text2: errorMessage,
//     });
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error("No response received from the server");
//     Toast.show({
//       topOffset: 60,
//       type: "error",
//       text1: "Signup Failed",
//       text2: "No response received from the server",
//     });
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.error("Error setting up the request:", error.message);
//     Toast.show({
//       topOffset: 60,
//       type: "error",
//       text1: "Signup Failed",
//       text2: "Error setting up the request",
//     });
//   }
// }
