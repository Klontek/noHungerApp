import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseUrl from "../../../assets/Common/baseUrl";

import AuthGlobal from "../../contexts/store/AuthGlobal";
import { LogoutUser } from "../../contexts/actions/Auth.action";
import { Button } from "react-native-elements";
// import { ScrollView } from "react-native-gesture-handler";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("SignInScreen");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseUrl}users/${context.stateUser.user.sub}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <Text style={{ marginTop: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text>Phone: {userProfile ? userProfile.phone : ""}</Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              LogoutUser(context.dispatch),
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default UserProfile;
