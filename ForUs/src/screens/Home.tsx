import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View, StyleSheet, Pressable, Text } from "react-native";
import { DrawerActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../../styles/globalStyles";
import DisplayImageComponent from "../../components/DisplayImageComponent";
import SearchBarComponent from "../../components/SearchBarComponent";
import CategoryBarComponent from "../../components/CategoryBarComponent";
import { getTopico, Topico } from "../api/TopicoService";
import { FlatList } from "react-native-gesture-handler";
import TopicoComponent from "../../components/TopicoComponent";
import { Curso, getCurso } from "../api/CursoService";

interface Props {
    navigation: StackNavigationProp<any>;
}

export default function Home({ navigation }: Props) {
    // Definimos las variables para obtener los topicos
    const [topico, setTopico] = useState<Topico[]>([]);

    // Bandera para la categoria
    const [bandera, setBandera] = useState(false);
    const [idCurso, setIdCurso] = useState();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    // Funcion para obtener los topicos
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const response = await getTopico(bandera, idCurso); // Obtener los datos del backend
                const topicos = response.content.map((item: any) => ({
                    id: item.id,
                    titulo: item.titulo,
                    mensaje: item.mensaje,
                    fecha: item.fecha,
                    curso: item.curso.categoria,
                    autor: item.autor,
                    autorOcupacion: item.autorOcupacion,
                    solucion: item.solucion,
                    listaRespuestas: item.respuestas.map((respuesta: any) => ({
                        id: respuesta.id,
                        contenido: respuesta.mensaje,
                        fecha: respuesta.fecha,
                        autor: respuesta.autor
                    }))
                }));

                console.log("Topicos: ", topicos);
                setTopico(topicos);
            };
            fetchData();
        }, [bandera, idCurso]) // Se ejecutará cuando la pantalla se enfoque o se seleccione otra categoria
    );

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

    // Variable para obtener una lista de curso
    const [curso, setCurso] = useState<Curso[]>([]);

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
                setCurso(cursos);
            };
            fetchData();
        }, []) // Solo se ejecutará cuando la pantalla se enfoque
    );

    // Pendiente funcion para mandar item a pantalla de TopicoScreen, donde se renderizara

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
                    <View style={[globalStyles.topScreen, styles.topArea]}>
                        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <MaterialCommunityIcons name="menu" size={50} color="#6B6B6B" />
                        </Pressable>
                        <DisplayImageComponent />
                    </View>
                    <View style={[globalStyles.inputArea, { justifyContent: 'flex-start' }]}>
                        <SearchBarComponent />
                        <View>
                            <FlatList
                                data={curso}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator
                                renderItem={({ item }) => (
                                    <View style={{ width: 250, marginRight: -167 }}>
                                        <CategoryBarComponent 
                                            item={item} 
                                            onSelectedCategory={handleCategorySelect}
                                            isSelected={selectedCategory === item.id} // Pasa el estado seleccionado 
                                        />
                                    </View>
                                )}
                            />
                        </View>
                        <Pressable style={styles.createBar} onPress={() => navigation.navigate("CreateTopico")}>
                            <Text style={globalStyles.text}>Crear un topico</Text>
                        </Pressable>
                        <FlatList
                            data={topico}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TopicoComponent
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    topArea: {
        flex: 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createBar: {
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        height: 50,
        backgroundColor: "#CDB388",
        borderColor: "#BFA375",
        borderRadius: 8,
        margin: 5,
    },

})