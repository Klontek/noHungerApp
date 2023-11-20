import { Dimensions } from "react-native"

// import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')


export const colors = {
 buttons: "#5C44AB",
 gray: "#83829A",
 // gray2: "#C1C0C0",
 gray1: "#462B9C", // dark purple
 gray2:"#FBFBFB", // purple
 gray3: "#36AE93", // light green
 gray4: "#4D4D4D", //text color gray
 gray5: "#e0e0e0", // button gray color
 gray6: "#94938f", // medium light gray 
 gray7: "#333332", //dark gray
 gray8: "#b8b7b6", //light gray
 lightGreen: "#66df48",
 CardComment: "#86939e",
 CardBackground: "white",
 statusBar: "#5C44AB",
 headerText: "white",
 borderColor: "#86939e",
 black: "black",
 primary: "#2A4D50",
 secondary: "#DDF0FF",
 tertiary: "#FF7754",
 offWhite: "#F3F4F8",
 green: "#00C135",
 lightWhite: "#FAFAFC"
}

export const parameters = {
 headerHeight: 40,
 styledButton: {
  backgroundColor: colors.buttons,
  alignContent: "center",
  justifyContent: "center",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.buttons,
  height: 50,
  paddingHorizontal: 20,
  width: "100%"
 },
 buttonTitle: {
  color: "white",
  fontSize: 20,
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "center",
  marginTop: -3
 }
}

export const title = {
 color: "#5C44AB",
 fontWeight: "bold",
 fontSize: 20
}

export const fonts = {
 ios: {
  regular: 'System',
  light: 'System',
  lightItalic: 'System',
  bold: 'System',
  boldItalic: 'System',
  black: 'System',
  blackItalic: 'System'
 },
 android: {
  regular: 'Roboto',
  italic: 'Roboto-Italic',
  thin: 'Roboto-thin',
  thinItalic: 'Roboto-ThinItalic',
  light: 'Roboto-Light',
  lightItalic: 'Roboto-LightItalic',
  medium: 'Roboto-Medium',
  mediumItalic: 'Roboto-MediumItalic',
  bold: 'Roboto-bold',
  boldItalic: 'Roboto-BoldItalic',
  condensed: 'RobotoCondensed-Regular',
  condensedItalic: 'RobotoCondensed-Italic'
 }
}
export const SHADOWS = {
 small: {
  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 2
 },
 medium: {
  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 5.84,
  elevation: 5
 }
}

export const SIZES = {
 xSmall: 10,
 small: 12,
 medium: 16,
 large: 20,
 xLarge: 24,
 xxLarge: 44,
 height,
 width
}