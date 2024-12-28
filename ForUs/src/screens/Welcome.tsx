import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import InputComponent from "../../components/inputComponent";
import InputPasswordComponent from "../../components/inputPasswordComponent";
import globalStyles from "../../styles/globalStyles";

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Welcome({ navigation }: Props) {
  return (
    <LinearGradient
      // Colores del degradado
      colors={["#020202", "#232323"]}
      // Posiciones del degradado
      locations={[0.47, 0.86]}
      // Dirección del degradado
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={globalStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={globalStyles.screen}>
            {/* Imagen y título */}
            <View style={globalStyles.topScreen}>
              <Image
                source={require("../../assets/ForUsLogo.png")}
                style={styles.image}
              />
              <Text style={globalStyles.title}>Bienvenido!</Text>
            </View>

            {/* Área de inputs */}
            <View style={globalStyles.inputArea}>
              <InputComponent text="Correo Electrónico" />
              <InputPasswordComponent text="Contraseña" />
            </View>

            {/* Botones */}
            <View style={globalStyles.buttonArea}>
              <Pressable style={globalStyles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={globalStyles.text}>Iniciar Sesión</Text>
              </Pressable>
              <Text style={globalStyles.text}>ó</Text>
              <Pressable style={[globalStyles.button, { width: "50%" }]} onPress={() => navigation.navigate("SignUp")}>
                <Text style={globalStyles.text}>Registrarse</Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    marginBottom: 20,
    height: 200,
    width: 200,
  },
});
