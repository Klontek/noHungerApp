import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { colors } from "../../global/styles.js";
import baseUrl from "../../../assets/Common/baseUrl";
import UploadProgress from "../../components/UploadProgress.js";
import FormSubmitButton from "../../components/AuthComponent/FormSubmitButton.js";

const ProductUpload = (props) => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permission to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      const res = await axios.post(`${baseUrl}upload-profile`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={openImageLibrary}
            style={styles.uploadBtnContainer}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Image</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.skip}>Skip</Text>

          {profileImage ? (
            <TouchableOpacity
              onPress={uploadProfileImage}
              style={styles.uploadButton}
            >
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {progress ? <UploadProgress process={progress} /> : null}

      <View style={styles.formSubmitButtonContainer}>
        <FormSubmitButton title="Submit" />
      </View>
    </>
  );
};

export default ProductUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
  uploadButton: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  uploadButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  formSubmitButtonContainer: {
    marginHorizontal: 125,
    flex: 1,
    width: 150,
  },
});
