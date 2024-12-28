import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import globalStyles from "../../styles/globalStyles";
import InputComponent from "../../components/inputComponent";
import InputPasswordComponent from "../../components/inputPasswordComponent";

interface Props {
    navigation: StackNavigationProp<any>;
}

export default function SignUp({ navigation }: Props) {
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
                            <InputComponent text="Nombre de usuario" />
                            <InputComponent text="Ocupación" />
                            <InputComponent text="Correo electronico" />
                            <InputComponent text="Confirmar correo electronico" />
                            <InputPasswordComponent text="Contraseña" />
                        </View>
                        <View style={globalStyles.buttonArea}>
                            <Pressable style={[globalStyles.button, {width: "60%"}]} onPress={() => navigation.navigate("Welcome")}>
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