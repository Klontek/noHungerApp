import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Avatar, Text } from "react-native-paper";

const SearchProduct = (props) => {
  const { productFiltered } = props;

  return (
    <View>
      {productFiltered.length > 0 ? (
        productFiltered.map((item) => (
          <List.Item
            key={item._id}
            onPress={() => {
              // Handle item press
            }}
            left={() => (
              <List.Icon
                icon={
                  item.image
                    ? { uri: item.image }
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                }
              />
            )}
            title={item.name}
            description={item.description}
          />
        ))
      ) : (
        <View style={styles.center}>
          <Text>No products match the selected criteria</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchProduct;
