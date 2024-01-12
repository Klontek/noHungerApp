import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import baseUrl from "../../../assets/Common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState(null);

  // useFocusEffect(
  //   useCallback(async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem("jwt");
  //       if (storedToken) {
  //         setToken(storedToken);
  //         const response = await axios.get(`${baseUrl}orders`, {
  //           headers: { Authorization: `Bearer ${storedToken}` },
  //         });
  //         setOrderList(response.data);
  //       } else {
  //         console.log("Token not found");
  //       }
  //     } catch (error) {
  //       console.log({ msg: "API error", error });
  //     }
  //   }, [])
  // );

  const getOrders = () => {
    axios
      .get(`${baseUrl}orders`)
      .then((res) => {
        console.log(res.data);
        setOrderList(res.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log({
          error: error,
          msg: "Api call error",
        });
      });
  };

  useEffect(() => {
    getOrders();

    return () => {
      setOrderList([]);
    };
  }, []);

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

export default Orders;
const styles = StyleSheet.create({});

// =================original orders component=====================

// import React, { useState, useCallback, useEffect } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import axios from "axios";
// import baseUrl from "../../../assets/Common/baseUrl";
// import { useFocusEffect } from "@react-navigation/native";
// import OrderCard from "../../components/OrderCard";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Orders = (props) => {
//   const [orderList, setOrderList] = useState([]);
//   const [token, setToken] = useState(null);

//   useFocusEffect(
//     useCallback(async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem("jwt");
//         if (storedToken) {
//           setToken(storedToken);
//           const response = await axios.get(`${baseUrl}orders`, {
//             headers: { Authorization: `Bearer ${storedToken}` },
//           });
//           setOrderList(response.data);
//         } else {
//           console.log("Token not found");
//         }
//       } catch (error) {
//         console.log({ msg: "API error", error });
//       }
//     }, [])
//   );

//   return (
//     <View>
//       <FlatList
//         data={orderList}
//         renderItem={({ item }) => (
//           <OrderCard navigation={props.navigation} {...item} editMode={true} />
//         )}
//         keyExtractor={(item) => item._id.toString()}
//       />
//     </View>
//   );
// };

// export default Orders;
// const styles = StyleSheet.create({});
