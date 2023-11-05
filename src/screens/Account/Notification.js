import { View, Text } from "react-native";
import React from "react";


const Notifications = () => {
  return (
   
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text>Oops ! You dont have any notification yet </Text>
      </View>
  );
};

export default Notifications;