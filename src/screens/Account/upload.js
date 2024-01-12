import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import EasyButton from "../../Shared/StyledComponent";
import { Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../../assets/Common/baseUrl";
import axios from "axios";
// import CustomPicker from "../../components/customPicker";
import { getShopData } from "../../../assets/Data/data";
// import ModalDropdown from "react-native-modal-dropdown";
import RNPickerSelect from "react-native-picker-select";
import { colors, SIZES } from "../../global/styles";
import * as ImagePicker from "expo-image-picker";
import mime from "mime"; // package to handle image upload

const UploadForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  // const navigation = useNavigation()

  const shopData = getShopData();

  // Function to filter out unique category objects from productData
  const extractCategories = (shopData) => {
    const categories = new Set();

    shopData.forEach((shop) => {
      shop.productData.forEach((product) => {
        const { category } = product;
        if (category) {
          categories.add(category);
        }
      });
    });

    // Convert Set to array and return
    return Array.from(categories);
  };

  useEffect(() => {
    // Extract unique categories from shopData
    const extractedCategories = extractCategories(shopData);
    setCategories(extractedCategories);

    // image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, you need camera permission to make this work!");
        }
      }
    })();

    // Cleanup function to clear categories when the component unmounts
    return () => {
      setCategories([]);
    };
  }, []);

  // image picker function for dummy data
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <FormContainer>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon
              name="camera"
              type="material-community"
              color={colors.offWhite}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
        </View>
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />

        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          keyboardType={"numeric"}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />

        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>
            Count In Stock
          </Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          keyboardType={"numeric"}
          value={countInStock}
          onChangeText={(text) => setCountInStock(text)}
        />

        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          keyboardType={"numeric"}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <RNPickerSelect
          placeholder={{
            label: "Select your category",
            value: null,
          }}
          items={categories.map((c) => ({
            label: c.name,
            value: c.id,
            key: c.id, // Add this line to provide a unique key
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
              borderColor: "#888",
              borderRadius: 4,
              color: "black",
              paddingRight: 30,
              marginTop: 10,
              marginLeft: 20,
              width: "75%",
            },
            inputAndroid: {
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: "#888",
              borderRadius: 8,
              color: "black",
              paddingRight: 30,
              marginTop: 10,
              marginLeft: 20,
              width: "75%",
            },
          }}
          value={pickerValue}
          useNativeAndroidPickerStyle={false}
        />
        {error ? <Error message={error} /> : null}
        <View style={styles.buttonContainer}>
          <EasyButton primary large onPress={() => addProduct()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -20,
  },
  label: {
    width: "80%",
    marginTop: 10,
    marginLeft: 20,
  },
  formContainer: {
    marginLeft: 20,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.CardBackground,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
    justifyContent: "center",
    marginHorizontal: "20%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default UploadForm;
