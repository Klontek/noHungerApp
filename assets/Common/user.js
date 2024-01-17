import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "./baseUrl";

export const signIn = async (email, password) => {
  try {
    const signInResponse = await axios.post(`${baseUrl}users/login`, {
      email,
      password,
    });
    console.log(signInResponse.data);

    if (signInResponse.data.success) {
      const token = signInResponse.data.token;
      console.log(token);
      await AsyncStorage.setItem("jwt", token);
    }
    return signInResponse;
  } catch (error) {
    console.error("Error in signIn:", error.message);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const token = await AsyncStorage.getItem("jwt");
    if (token !== null) {
      const res = await axios.post("sign-out", null, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.removeItem("jwt");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log("error inside sign-out method", error.message);
    return false;
  }
};
