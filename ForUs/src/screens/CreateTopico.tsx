import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View, Text, Pressable } from "react-native";
import InputComponent from "../../components/inputComponent";
import globalStyles from "../../styles/globalStyles";
import InputPasswordComponent from "../../components/inputPasswordComponent";
import { useState } from "react";
import { addTopico } from "../api/TopicoService";
import CategoryBarComponent from "../../components/CategoryBarComponent";
import { useUser } from "../api/UserProvider";

interface Props {
    navigation: StackNavigationProp<any>;
    onTopicoAdd: () => void;
}

export default function CreateTopico({ navigation, onTopicoAdd }: Props) {
    // Variable global
    const { userId } = useUser();    
    const IdAutor = Number(userId);

    console.log("Tu ID es: ", IdAutor);

    // Variables de los campos
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [IdCurso, setIdCurso] = useState();
    const [solucion, setSolucion] = useState("");

    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
        time: string;
    } | null>(null);

    const handleAction = () => {
        // Llamamos al Service
        addTopico(
            navigation,
            titulo,
            mensaje,
            IdAutor,
            IdCurso,
            solucion,
            onTopicoAdd,
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
                    <View style={globalStyles.topScreen}>
                        <Text style={globalStyles.title}>Crear Topico</Text>
                    </View>
                    <View style={[globalStyles.inputArea, { justifyContent: 'flex-start' }]}>
                        <View>
                            <Text style={[globalStyles.title, {fontWeight: 'medium', fontSize: 25}]}>Categoria</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingRight: 25 }}>
                                <CategoryBarComponent text="Cocina" />
                                <CategoryBarComponent text="Tecnologia" />
                                <CategoryBarComponent text="Redes Sociales" />
                                <CategoryBarComponent text="Noticias" />
                            </View>
                            <InputComponent text="Titulo" value={titulo} variable={setTitulo}/>
                            <InputComponent text="Mensaje" value={mensaje} variable={setMensaje}/>
                            <Text style={[globalStyles.title, {fontWeight: 'medium', fontSize: 25}]}>¿Requiere una Solución?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                                <CategoryBarComponent text="No" />
                                <CategoryBarComponent text="Si" />
                            </View>
                        </View>
                    </View>
                    <View style={globalStyles.buttonArea}>
                        {error && (
                            <Text style={globalStyles.error}>
                                {error.title}: {error.errorMessages.join(", ")}
                            </Text>
                        )}
                        <Pressable style={[globalStyles.button, { width: "60%" }]} onPress={handleAction}>
                            <Text style={globalStyles.text}>Postear</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}