import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Error = ({ message }) => {
  return <Text style={styles.errorText}>{message}</Text>;
};

export default Error;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
