// import { useNavigation } from '@react-navigation/native'
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighLight,
  Dimensions,
  Button,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import EasyButton from "../../Shared/StyledComponent";

const { width } = Dimensions.get("window");

const AdminListItem = ({
  deleteProduct,
  brand,
  itemName,
  categoryName,
  price,
  image,
  navigation,
  index,
  item,
}) => {
  // const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => [
                navigation.navigate("ProductForm"),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [deleteProduct(item._id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AdminProductDetail", {
            item: item,
            // brand: brand,
            // itemName: itemName,
            // categoryName: categoryName,
            // price: price,
            // image: image,
            // index: index,
            // item: item,
          })
        }
        style={[
          styles.container,
          {
            backgroundColor: index % 2 == 0 ? "white" : "gainsboro",
          },
        ]}
        onLongPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: image }}
          // source={
          //  image
          //  ? image
          //  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
          // }
          resizeMode="contain"
          style={styles.image}
        />

        <Text style={styles.item}>{brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {itemName}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {categoryName}
        </Text>
        <Text style={styles.item}>{price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AdminListItem;
