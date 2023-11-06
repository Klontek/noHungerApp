// Install the necessary libraries
// npm install react-native-elements react-navigation react-navigation-stack

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Header, Button, Icon, Divider } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const MultiStepper = () => {
  const navigation = useNavigation()
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleSave = () => {
    // Handle saving data for the current step
    console.log('Save data for step:', activeStep);

    if (activeStep < 2) {
      // If not the last step, navigate to the next step
      handleNext();
    } else {
      navigation.navigate('RegisterBusinessScreen');
      // If the last step, show alert and optionally perform other actions
      alert('Business created successfully');
      // // Optionally, you can reset the stepper to the initial step
      // setActiveStep(0);
      // Optionally, you can navigate to another screen
  
    }
  };

  const getIconName = (index) => {
    switch (index) {
      case 0:
        return 'user';
      case 1:
        return 'login';
      case 2:
        return 'payment';
      default:
        return 'user';
    }
  };

  const getStepName = (index) => {
    switch (index) {
      case 0:
        return 'Registration';
      case 1:
        return 'Login';
      case 2:
        return 'Payment';
      default:
        return '';
    }
  };

  const renderHeader = () => {
    return (
      <Header
        placement="left"
        leftComponent={<Icon name="chevron-left" type="entypo" color="#fff" onPress={() => setActiveStep((prevStep) => Math.max(0, prevStep - 1))} />}
        centerComponent={<Text style={styles.headerText}>{getStepName(activeStep)}</Text>}
        rightComponent={<Icon name="dots-three-horizontal" type="entypo" color="#fff" />}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.content}>
        <Text>{getStepName(activeStep)} Screen Content</Text>
      </View>
      <Divider />
      <View style={styles.footer}>
        <Button title="Save to continue" onPress={handleSave} />
      </View>
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MultiStepper,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Business Console',
        headerLeft: () => (
         <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="entypo"
            color="black" 
          />
         </Pressable>

        ),
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
});