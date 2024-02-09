import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, Snackbar } from "react-native-paper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleResetPassword = () => {
    // Perform password reset logic here
    // You may want to send a password reset email to the provided email addres
    // For the purpose of this example, just show a snackbar
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Forgot Password</Title>
      <TextInput
        label="Recovery Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
      >
        Reset Password
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        Password reset instructions sent to {email}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  snackbar: {
    backgroundColor: "#4CAF50",
  },
});

export default ForgotPassword;
