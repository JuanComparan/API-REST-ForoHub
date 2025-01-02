import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import globalStyles from "../../styles/globalStyles";
import InputComponent from "../../components/inputComponent";
import InputPasswordComponent from "../../components/inputPasswordComponent";
import { autorError, crearAutor } from "../api/SignUpService";
import { useEffect, useState } from "react";

interface Props {
    navigation: StackNavigationProp<any>;
    onAutorAdd: () => void;
}

export default function SignUp({ navigation, onAutorAdd }: Props) {
    // Definimos las variables
    const [nombre, setNombre] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [ocupacion, setOcupacion] = useState("");
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
        crearAutor(
            navigation,
            nombre,
            correoElectronico,
            contrasena,
            ocupacion,
            onAutorAdd,
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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={globalStyles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={globalStyles.screen}>
                        <View style={globalStyles.topScreen}>
                            <Text style={globalStyles.title}>Registro</Text>
                        </View>
                        <View style={globalStyles.inputArea}>
                            <InputComponent text="Nombre de usuario" value={nombre} variable={setNombre} />
                            <InputComponent text="Ocupación" value={ocupacion} variable={setOcupacion} />
                            <InputComponent text="Correo electronico" value={correoElectronico} variable={setCorreoElectronico} />
                            <InputPasswordComponent text="Contraseña" value={contrasena} variable={setContrasena} />
                        </View>
                        <View style={globalStyles.buttonArea}>
                            {error && (
                                <Text style={globalStyles.error}>
                                    {error.title}: {error.errorMessages.join(", ")}
                                </Text>
                            )}
                            <Pressable style={[globalStyles.button, { width: "60%" }]} onPress={handleAction}>
                                <Text style={globalStyles.text}>Registrarse</Text>
                            </Pressable>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    inputArea: {

    },
})