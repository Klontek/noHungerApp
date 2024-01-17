// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import {Container, Header, Content, ListItem, Text, Radio, Right, Left, Picker, Icon, Body, Title} from "react-native";

// const methods = [
//   { name: "Cash on Delivery", value: 1 },
//   { name: "Bank Transfer", value: 2 },
//   { name: "Card Payment", value: 3 },
// ];

// const paymentCards = [
//   { name: "Wallet", value: 1 },
//   { name: "Visa", value: 2 },
//   { name: "MasterCard", value: 3 },
//   { name: "Other", value: 4 },
// ];
// const Payment = (props) => {

//   const order = props.route.params

//   const [selected, setSelected] = useState()
//   const [card, setCard] = useState()
//   return (
//     <Container>
//       <Header>
//         <Body>
//           <Title>Choose your payment method</Title>
//         </Body>
//       </Header>
//       <Content>
//         {methods.map((item, index) => {
//           return (
//             <ListItem
//               key={item.name}
//               onPress={() => setSelected(item.value)}>
//               <Left>
//                 <Text>{item.name}</Text>
//               </Left>
//               <Right selected={selected == item.value}/>
//             </ListItem>
//           )
//         })}

//         {selected == 3 ? (
//           <Picker

//           mode="dropdown"
//           iosIcon={<Icon name={"arrow-down"}/>}
//           headerStyle={{backgroundColor: 'orange'}}
//           headerBackButtonTextStyle={{color: "#fff"}}
//           headerTitleStyle={{color: "#fff"}}
//           selectedValue={card}
//           onValueChange={(x) => setCard(x)}
//           >
//             {paymentCards.map((c, index) => {
//               return (
//                 <Picker.Item
//                 key={c.name}
//                 label={c.name}
//                 value={c.name}
//                 />
//               )
//             })}
//           </Picker>
//         ): (null)
//       }

//       <View style={{marginTop: 60, alignSelf: "center"}}>
//         <Button
//           title={"confirm"}
//           onPress={() => props.navigation.navigate("Confirm", {order})}
//         />
//       </View>
//       </Content>
//     </Container>
//   );
// };

// export default Payment;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Headline,
  RadioButton,
  Text,
  Card,
  Paragraph,
  Title,
  Picker,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Choose your payment method</Title>
          {methods.map((item, index) => (
            <RadioButton.Item
              key={item.name}
              label={item.name}
              value={item.value}
              status={selected === item.value ? "checked" : "unchecked"}
              onPress={() => setSelected(item.value)}
            />
          ))}

          {selected === 3 && (
            <RNPickerSelect
              onValueChange={(value) => setCard(value)}
              items={paymentCards.map((c, index) => ({
                key: c.name,
                label: c.name,
                value: c.name,
              }))}
              value={card}
              // style={pickerSelectStyles}
            />
          )}

          <Button
            mode="contained"
            style={styles.button}
            // onPress={() =>
            //   props.navigation.navigate("Confirm", { order: order })
            // }
          >
            Confirm
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default Payment;
