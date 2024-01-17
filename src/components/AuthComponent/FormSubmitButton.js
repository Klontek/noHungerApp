import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../global/styles";

const FormSubmitButton = ({ title, onPress, submitting }) => {
  const backgroundColor = submitting ? "#bdb4dd" : "#5C44AB";

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  container: {
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
  view17: {
    marginVertical: 10,
    marginTop: 30,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
