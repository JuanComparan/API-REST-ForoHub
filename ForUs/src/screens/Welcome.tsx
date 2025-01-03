import React, { useEffect, useState } from "react";
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
import { autorError, iniciarSesion } from "../api/SignUpService";

interface Props {
  navigation: StackNavigationProp<any>;
  onSuccess: () => void;
}

export default function Welcome({ navigation, onSuccess }: Props) {
  // Definimos las variables
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  // Variable para guardar errores
  const [error, setError] = useState<{
    title: string;
    errorMessages: string[];
  } | null>(null);

  useEffect(() => {
    setError(autorError);
  }, [autorError]);

  const handleAction = () => {
    // Llamamos al Service
    iniciarSesion(
      navigation,
      correoElectronico,
      contrasena,
      onSuccess,
      setError
    )
  };

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
        <ScrollView
          contentContainerStyle={globalStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={globalStyles.screen}>
            {/* Imagen y título */}
            <View style={[globalStyles.topScreen, {marginTop: 0}]}>
              <Image
                source={require("../../assets/ForUsLogo.png")}
                style={styles.image}
              />
              <Text style={globalStyles.title}>Bienvenido!</Text>
            </View>

            {/* Área de inputs */}
            <View style={globalStyles.inputArea}>
              <InputComponent text="Correo Electrónico" value={correoElectronico} variable={setCorreoElectronico} />
              <InputPasswordComponent text="Contraseña" value={contrasena} variable={setContrasena} />
            </View>
            {error && (
              <View>
                <Text style={globalStyles.error}>
                  {error.title}: {error.errorMessages.join(", ")}
                </Text>
              </View>
            )}
            {/* Botones */}
            <View style={globalStyles.buttonArea}>
              <Pressable style={globalStyles.button} onPress={handleAction}>
                <Text style={globalStyles.text}>Iniciar Sesión</Text>
              </Pressable>
              <Text style={globalStyles.text}>ó</Text>
              <Pressable style={[globalStyles.button, { width: "50%" }]} onPress={() => navigation.navigate("SignUp")}>
                <Text style={globalStyles.text}>Registrarse</Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
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
