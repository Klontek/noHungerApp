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

const ProductForm = (props) => {
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

  const shopData = getShopData();

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

  // Api UseEffect
  // useEffect(() => {

  //   // to update/Edit ProductForm
  //   if(!props.route.params) {
  //     setItem(null)
  //   }else{
  //     setItem(props.route.params.item);
  //     setBrand(props.route.params.item.brand);
  //     setName(props.route.params.item.name);
  //     setPrice(props.route.params.item.price.toString());
  //     setDescription(props.route.params.item.description);
  //     setMainImage(props.route.params.item.image);
  //     setImage(props.route.params.item.image);
  //     setCategory(props.route.params.item.category._id);
  //     setCountInStock(props.route.params.item.countInStock.toString());
  //   }

  // // to get token form AsyncStorage
  // AsyncStorage.getItem("jwt")
  //   .then((res) => {
  //     setToken(res);
  //   })
  //   .catch((error) => console.log(error));

  //   //categories
  //   axios
  //     .get(`${baseUrl}categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((error) => alert("Error to load categories"));

  //       // image Picker
  //       (async () => {
  //         if(Platform.OS !== "web") {
  //           const {status} = await ImagePicker.requestCameraPermissionsAsync()
  //           if(status !== "granted") {
  //             alert("Sorry, you need camera permission to make this work!")
  //           }
  //         }
  //       })();

  //   return () => {
  //     setCategories([]);
  //   };
  // }, [])
  // pick image function for Api
  // const pickImage = async() => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4,3],
  //     quality: 1
  //   })

  //   if(!result.canceled) {
  //     setMainImage(result.uri);
  //     setImage(result.uri)
  //   }
  // }

  // const addProduct = () => {
  //   if (
  //     name == "" ||
  //     brand == "" ||
  //     price == "" ||
  //     description == "" ||
  //     category == "" ||
  //     countInStock == ""
  //   ) {
  //     setError("Please fill in the form correctly!");
  //   }

  //   let formData = new FormData();

  //   const newImageUri = "file:///" + image.split("file:/").join("");

  //   formData.append("image", {
  //     uri: newImageUri,
  //     type: mime.getType(newImageUri),
  //     name: newImageUri.split("/").pop(), //to get only the name of the uploaded image
  //   });
  //   formData.append("name", name);
  //   formData.append("brand", brand);
  //   formData.append("price", price);
  //   formData.append("description", description);
  //   formData.append("category", category);
  //   formData.append("countInStock", countInStock);
  //   formData.append("richDescription", richDescription);
  //   formData.append("rating", rating);
  //   formData.append("numReviews", numReviews);
  //   formData.append("isFeatured", isFeatured);

  //   // get token for authorization
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   if(item !== null){
  //     axios
  //       .put(`${baseUrl}products/${item.id}`, formData, config)
  //       .then((res) => {
  //         if (res.status == 200 || res.status == 201) {
  //           Toast.show({
  //             topOffset: 60,
  //             type: "success",
  //             text1: "Product successfully updated!",
  //             text2: "",
  //           });
  //           setTimeOut(() => {
  //             props.navigation.navigate("Products");
  //           }, 500);
  //         }
  //       })
  //       .catch((error) => {
  //         Toast.show({
  //           topOffset: 60,
  //           type: "error",
  //           text1: "Something went wrong",
  //           text2: "Please try again",
  //         });
  //       });

  //   }else {
  //   axios
  //     .post(`${baseUrl}products`, formData, config)
  //     .then((res) => {
  //       if (res.status == 200 || res.status == 201) {
  //         Toast.show({
  //           topOffset: 60,
  //           type: "success",
  //           text1: "New Product Added",
  //           text2: "",
  //         });
  //         setTimeOut(() => {
  //           props.navigation.navigate("Products");
  //         }, 500);
  //       }
  //     })
  //     .catch((error) => {
  //       Toast.show({
  //         topOffset: 60,
  //         type: "error",
  //         text1: "Something went wrong",
  //         text2: "Please try again",
  //       });
  //     });
  //   }

  // };

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

export default ProductForm;