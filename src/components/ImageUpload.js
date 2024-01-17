import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../global/styles";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl.js";
import UploadProgress from "./UploadProgress";
// import baseUrl from "noHungerTest/assets/Common/baseUrl.js";

const ImageUpload = (props) => {
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const { token } = props.route.params;

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
          authorization: `JWT ${token}`,
        },
        onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
      });

      if (res.data.success) {
        props.navigation.dispatch(StackActions.replace("SignInScreen"));
      }
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
              <Text style={styles.uploadBtn}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>

          {/* {progress ? <Text>{progress}</Text>: null}  */}
          <Text style={styles.skip}>Skip</Text>

          {profileImage ? (
            <Text
              onPress={uploadProfileImage}
              style={[
                styles.skip,
                {
                  backgroundColor: colors.buttons,
                  color: "white",
                  borderRadius: 8,
                },
              ]}
            >
              Upload
            </Text>
          ) : null}
        </View>
      </View>
      {progress ? <UploadProgress process={progress} /> : null}
    </>
  );
};

export default ImageUpload;

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
    testTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});
