import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View, Text, Pressable, FlatList } from "react-native";
import InputComponent from "../../components/inputComponent";
import globalStyles from "../../styles/globalStyles";
import { useEffect, useState } from "react";
import { addTopico } from "../api/TopicoService";
import CategoryBarComponent from "../../components/CategoryBarComponent";
import { Curso, getCurso } from "../api/CursoService";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import InputLargeText from "../../components/inputLargeText";
import { getUserId } from "../api/AsyncStorageService";
import SolutionBoxComponent from "../../components/SolutionBoxComponent";

interface Props {
    navigation: StackNavigationProp<any>;
    onTopicoAdd: () => void;
}

export default function CreateTopico({ navigation, onTopicoAdd }: Props) {
    // Obtener el ID del usuario guardado globalmente.
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user_id = await getUserId("UserId");
                console.log("ID en crear topico: ", user_id);
                setIdAutor(user_id);
            } catch {
                console.error("Error al obtener el ID del usuario: ", error);
            }
        };

        fetchUserId();
    }, []);
    
    // Variables de los campos
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [IdCurso, setIdCurso] = useState();
    const [IdAutor, setIdAutor] = useState();
    const [solucion, setSolucion] = useState("");

    // Variable para obtener una lista de curso
    const [curso, setCurso] = useState<Curso[]>([]);
    const [bandera, setBandera] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    // Funcion para obtener los cursos
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const response = await getCurso(); // Obtener los datos del backend
                const cursos = response.content.map((item) => ({
                    id: item.id,
                    nombre: item.nombre,
                    categoria: item.categoria
                }));
                console.log("Cursos: ", cursos);
                setCurso(cursos);
            };
            fetchData();
        }, []) // Solo se ejecutará cuando la pantalla se enfoque
    );

    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
        time: string;
    } | null>(null);

    const handleAction = () => {
        // Llamamos al Service
        console.log(
            "Titulo: ",
            titulo,
            "Mensaje: ",
            mensaje,
            "ID autor: ",
            IdAutor,
            "ID curso: ",
            IdCurso,
            "Solucion: ",
            solucion
        )

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

    const handleCategorySelect = (idCurso: number) => {
        if (selectedCategory === idCurso) {
            // Si la categoría ya está seleccionada, deseleccionarla
            setSelectedCategory(null);
            setBandera(false); // Vuelve a mostrar todos los tópicos
            setIdCurso(undefined); // Limpia el ID del curso
        } else {
            // Seleccionar una nueva categoría
            setSelectedCategory(idCurso);
            setBandera(true); // Filtra por categoría
            setIdCurso(idCurso); // Establece el ID del curso seleccionado
        }
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
                    <View style={{ backgroundColor: "rgba(43, 43, 43, 0.5)", flex: 1, marginBottom: 20, marginTop: 20, marginHorizontal: 10, borderRadius: 12 }}>
                        <View style={[globalStyles.inputArea, { justifyContent: 'flex-start' }]}>
                            <View>
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={[globalStyles.title, { fontWeight: 'medium', fontSize: 25, marginVertical: 20 }]}>Categoria</Text>
                                    <FlatList
                                        data={curso}
                                        keyExtractor={(item) => item.id.toString()}
                                        horizontal
                                        showsHorizontalScrollIndicator
                                        renderItem={({ item }) => (
                                            <View style={{ width: 250, marginRight: -168 }}>
                                                <CategoryBarComponent
                                                    item={item}
                                                    onSelectedCategory={handleCategorySelect}
                                                    isSelected={selectedCategory === item.id}
                                                />
                                            </View>
                                        )}
                                    />
                                </View>
                                <InputComponent text="Titulo" value={titulo} variable={setTitulo} />
                                <InputLargeText text="Mensaje" value={mensaje} variable={setMensaje} />
                                <Text style={[globalStyles.title, { fontWeight: 'medium', fontSize: 25, marginVertical: 10}]}>¿Requiere una Solución?</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <SolutionBoxComponent text="Si" solucion={setSolucion} />
                                    <SolutionBoxComponent text="No" solucion={setSolucion} />
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
                </View>
            </ScrollView>
        </LinearGradient>
    )
}