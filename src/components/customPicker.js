import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text } from "react-native";

const CustomPicker = ({
  pickerValue,
  setPickerValue,
  categories,
  setCategory,
}) => {
  return (
    <View>
      <RNPickerSelect
        placeholder={{
          label: "Select your category",
          value: null,
        }}
        items={categories.map((c) => ({
          label: c.name,
          value: c.id,
        }))}
        onValueChange={(value) => {
          setPickerValue(value);
          setCategory(value);
        }}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            color: "black",
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: "purple",
            borderRadius: 8,
            color: "black",
            paddingRight: 30, // to ensure the text is never behind the icon
          },
        }}
        value={pickerValue}
        useNativeAndroidPickerStyle={false} // optional, but required for styled Android picker
      />
    </View>
  );
};

export default CustomPicker;
