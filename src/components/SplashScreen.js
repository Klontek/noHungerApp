import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import logo from "../../assets/newHungerLogo.png"; // Adjust the path to your logo

const SplashScreen = () => {
  const bounceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(bounceAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[
          styles.logo,
          {
            transform: [
              {
                scale: bounceAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // Adjust the width of the logo as needed
    height: 200, // Adjust the height of the logo as needed
  },
});

export default SplashScreen;
