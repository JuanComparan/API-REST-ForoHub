import { View, Text, StyleSheet, Image, Pressable, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import DisplayImageComponent from "./DisplayImageComponent";
import globalStyles from "../styles/globalStyles";
import { useEffect, useState } from "react";
import React from "react";
import { Autor, getAutor } from "../src/api/SignUpService";
import { addRespuesta } from "../src/api/RespuestaService";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
    IdTopico: number;
    IdAutor: number;
    navigation?: StackNavigationProp<any>;
    onReplyAdd?: () => void;
}

export default function ReplyBoxComponent({ IdTopico, IdAutor, navigation, onReplyAdd }: Props) {
    console.log("ID del topico: ", IdTopico);
    console.log("ID del usuario en respuesta: ", IdAutor);

    // Definir variables
    const [mensaje, setMensaje] = useState("");
    const [autor, setAutor] = useState<Autor | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await getAutor(IdAutor); // Obtener los datos del backend
                    if (response) {
                        console.log("Autor: ", response);
                        setAutor(response);
                    } else {
                        console.warn("No se encontró información para el autor con ID: ", IdAutor);
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del autor: ", error);
                }
            };
            fetchData();
        }, [])
    );

    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
        time: string;
    } | null>(null);

    const handleAction = () => {
        console.log(
            "Mensaje: ",
            mensaje,
            "ID topico: ",
            IdTopico,
            "ID autor: ",
            IdAutor,
        )

        addRespuesta(
            navigation,
            mensaje,
            IdTopico,
            IdAutor,
            onReplyAdd,
            setError
        )
    }

    return (
        <View style={styles.topico}>
            <View style={styles.topicoTopArea}>
                <DisplayImageComponent />
                <View style={styles.topicoTitle}>
                    <Text style={globalStyles.text}>{autor.nombre}</Text>
                    <Text style={styles.topicoAlterText}>{autor.ocupacion}</Text>
                </View>
            </View>
            <View style={styles.topicoMidArea}>
                <TextInput
                    style={styles.input}
                    multiline
                    textAlignVertical="top"
                    scrollEnabled
                    value={mensaje}
                    onChangeText={setMensaje}
                />
                <View style={styles.line} />
            </View>
            <View style={styles.topicoBottomArea}>
                <View style={styles.bottomIcon}>
                    <Pressable onPress={handleAction}>
                        <View style={styles.box}>
                            <Text style={[styles.topicoText, { textAlign: 'center' }]}>Responder</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topico: {
        alignSelf: "center",
        justifyContent: "center",
        width: "95%",
        height: "auto",
        backgroundColor: "#2B2B2B",
        borderColor: "#2B2B2B",
        borderRadius: 8,
        margin: 5,
    },
    topicoTopArea: {
        //backgroundColor: 'red',
        flex: 1.2,
        flexDirection: 'row',
        margin: 10,
    },
    topicoTitleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    topicoText: {
        fontSize: 14,
        fontWeight: "medium",
        color: "#ffffff",
    },
    topicoAlterText: {
        color: "#BCBCBC",
    },
    topicoTitle: {
        paddingHorizontal: 10
    },
    topicoMidArea: {
        flex: 2,
        paddingLeft: 10,
    },
    line: {
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: '#BCBCBC',
        width: '95%',
    },
    topicoBottomArea: {
        flex: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    bottomIcon: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    box: {
        width: 80,
        height: 20,
        backgroundColor: "#3E99DA",
        borderColor: "#747171",
        borderRadius: 4,
        elevation: 5,
    },
    input: {
        width: '95%',
        borderWidth: 1,
        borderColor: "#FFFFFF",
        padding: 10,
        paddingBottom: 50,
        fontSize: 18,
        color: "#ffffff"
    },
})