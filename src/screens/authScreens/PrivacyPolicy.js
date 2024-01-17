import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Title, Paragraph, List, Button } from "react-native-paper";
import RadioGroup from "react-native-radio-buttons-group";

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "accept",
      label: "I have read and accept the terms and conditions",
      value: "accept",
    },
  ]);

  const handleRadioPress = (data) => {
    setRadioButtons([data]);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Privacy Policy</Title>
      <Paragraph>Last updated: January 14, 2024</Paragraph>

      {/* ... Other HTML content ... */}

      <List.Section>
        <List.Subheader>Changes to this Privacy Policy</List.Subheader>
        <Paragraph>
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </Paragraph>
        {/* ... More content ... */}
      </List.Section>

      <List.Section>
        <List.Subheader>Contact Us</List.Subheader>
        <List.Item
          title="By email: joe2sure@gmail.com"
          left={() => <List.Icon icon="email" />}
        />
        {/* ... More contact information ... */}
      </List.Section>

      <View style={styles.radioContainer}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handleRadioPress}
          layout="row"
          style={styles.radioGroup}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignUpScreen")}
        style={styles.button}
        disabled={radioButtons[0].value !== "accept"}
      >
        Accept
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 16,
  },
  radioContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  radioGroup: {
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
  },
});

export default PrivacyPolicy;
