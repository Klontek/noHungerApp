import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Animated } from "react-native";
import { getShopData } from "../../assets/Data/data";
import { colors } from "../global/styles";
import { Icon } from "react-native-elements";

export default function ShopHeader({ navigation, id }) {
  const shopData = getShopData();
  const currentValue = new Animated.Value(1);

  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);

  const LikedHandler = () => {
    setVisible(true);
    setLiked(!liked);
    Animated.spring(currentValue, {
      toValue: liked ? 1 : 3,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={shopData[id].images}
      >
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Icon
              name="arrow-left"
              type="material"
              color={colors.black}
              size={25}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.view3}>
            <Icon
              name={liked ? 'favorite' : 'favorite-border'}
              type="material"
              color="red"
              size={30}
              onPress={LikedHandler}
            />
          </View>
        </View>

        <View style={styles.view4}>
          {visible && (
            <Animated.View style={{ transform: [{ scale: currentValue }] }}>
              <Icon name="favorite" size={40} color="red" type="material" />
            </Animated.View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  view1: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  view2: {
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: colors.CardBackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  view3: {
    marginTop: 10,
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: colors.CardBackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  view4: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
