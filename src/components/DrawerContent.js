import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Linking,
  Pressable,
  Alert,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Button, Icon } from "react-native-elements";
import { colors } from "../global/styles";
import AuthGlobal from "../contexts/store/AuthGlobal";
import { LogoutUser } from "../contexts/actions/Auth.action";
import { userData } from "../../assets/Data/userData";
import { BackHandler } from "react-native";

export default function DrawerContent(props) {
  const { dispatch } = useContext(AuthGlobal);
  const [profilePic, setProfilePic] = useState(userData.profilePic);
  // const [userProfile, setUserProfile] = useState();
  // const [orders, setOrders] = useState();

  // useFocusEffect(
  //   useCallback(() => {

  //     AsyncStorage.getItem("jwt")
  //       .then((res) => {
  //         axios
  //           .get(`${baseUrl}users/${context.stateUser.user.sub}`, {
  //             headers: { Authorization: `Bearer ${res}` },
  //           })
  //           .then((user) => setUserProfile(user.data));
  //       })
  //       .catch((error) => console.log(error));

  //     axios
  //       .get(`${baseUrl}orders`)
  //       .then((res) => {
  //         const data = res.data;
  //         const userOrders = data.filter(
  //           (order) => order.user._id === context.stateUser.user.sub
  //         );
  //         setOrders(userOrders);
  //       })
  //       .catch((error) => console.log(error));

  //     return () => {
  //       setUserProfile();
  //       setOrders();
  //     };
  //   }, [context.stateUser.isAuthenticated])
  // );

  async function signOut() {
    try {
      LogoutUser(dispatch); // Call the LogoutUser function
      console.log("sign Out");
      BackHandler.exitApp();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: colors.buttons }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              paddingVertical: 10,
            }}
          >
            <Avatar
              rounded
              avatarStyle={styles.avatar}
              size={75}
              source={{ uri: profilePic }}
            />

            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: colors.CardBackground,
                  fontSize: 18,
                }}
              >
                noHungerApp
              </Text>
              <Text style={{ color: colors.CardBackground, fontSize: 12 }}>
                Developer: Joe
              </Text>
              <Text style={{ color: colors.CardBackground, fontSize: 12 }}>
                Email: Joe2Sure1@gmail.com
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colors.CardBackground,
                    fontSize: 18,
                  }}
                >
                  1
                </Text>
                <Text style={{ color: colors.CardBackground, fontSize: 12 }}>
                  Favorites
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colors.CardBackground,
                    fontSize: 18,
                  }}
                >
                  0
                </Text>
                <Text style={{ color: colors.CardBackground, fontSize: 12 }}>
                  My Basket
                </Text>
              </View>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />

        <DrawerItem
          label="payment"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="credit-card-outline"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Promotions"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="tag-heart"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
        />

        <DrawerItem
          label="Help"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="lifebuoy"
              color={color}
              size={size}
            />
          )}
        />

        {/* Drawer Preference Section */}

        <View style={{ borderTopWidth: 1, borderTopColor: colors.gray7 }}>
          <Text style={styles.preferences}>Preferences</Text>

          <View style={styles.switchText}>
            <Text style={styles.darkMode}>Dark Mode</Text>

            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                thumbColor="#f4f3f4"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Drawer Sign Out section */}
      <TouchableOpacity>
        <DrawerItem
          onPress={() => signOut()}
          label="Log Out"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="logout-variant"
              color={color}
              size={size}
            />
          )}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderWidth: 4,
    borderColor: colors.CardBackground,
  },
  preferences: {
    fontSize: 16,
    color: colors.gray4,
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingVertical: 5,
    paddingLeft: 20,
  },
  darkMode: {
    fontSize: 16,
    color: colors.gray4,
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: "bold",
  },
});

// import { logOut } from "../../assets/Common/user";
// import { useLogin } from "../contexts/LoginProvider";
// import {FIREBASE_AUTH} from '../../db/firestore'
// import {SignInContext} from "../contexts/authContext"

// onPress={async () => {
//   setLoginPending(true);
//   const isLoggedOut = await logOut();
//   if (isLoggedOut) {
//     setIsLoggedIn(false);
//   }
//   setLoginPending(false);
// }}

// }
// const auth = FIREBASE_AUTH;

// const {dispatchSignedIn} = useContext(SignInContext)

// async function signOut() {
//   try{
//     auth.signOut().then(() => {
//       console.log('USER SUCCESSFULLY SIGNED OUT')
//       dispatchSignedIn({type: 'UPDATE_SIGN_IN', payload: {userToken: null}})
//     })

//   }catch(error){
//     Alert.alert(error.code)
//   }
