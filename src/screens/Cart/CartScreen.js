import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

const CartScreen = (props) => {
  return (
    <View>
      {props.cartItems.map((x, index) => (
        <Text key={index}>{x.product.name}</Text>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({});

export default CartScreen;
