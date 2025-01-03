import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DisplayImageComponent = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const storedImageUri = await AsyncStorage.getItem("imageUri");
      if (storedImageUri) {
        setImageUri(storedImageUri);
      }
    };

    loadImage();
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../assets/images/iconUser.png") // Placeholder si no hay imagen
        }
        style={styles.image}
      />
    </View>
  );
};

export default DisplayImageComponent;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: "cover",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});