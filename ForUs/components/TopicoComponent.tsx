import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import DisplayImageComponent from "./DisplayImageComponent";
import globalStyles from "../styles/globalStyles";
import { Topico } from "../src/api/TopicoService";
import CategoryBarComponentText from "./CategoryBarComponentText";
import { useEffect, useState } from "react";
import { getUserId } from "../src/api/AsyncStorageService";
interface Props {
    item: Topico;
    navigation: StackNavigationProp<any>;
    id_autor?: number;
    noShowBottomIcons?: boolean;
}

export default function TopicoComponent({ item, navigation, id_autor, noShowBottomIcons }: Props) {

    // Pendiente Funcion para recibir parametros y colocarlos de ser asi
    const handlePress = (item: Topico) => {
        console.log("Presiono el topico");
        navigation.navigate("TopicoScreen", {
            topico: item
        })
    }

    const handlePressReply = (item: Topico, id_autor: number) => {
        console.log("Presiono el topico");
        console.log("ID recibida antes de entrar a respuestas: ", id_autor);
        navigation.navigate("CreateReply", {
            topico: item,
            IdAutor: id_autor
        })
    }

    return (
        <Pressable onPress={() => handlePress(item)}>
            <View style={styles.topico}>
                <View style={styles.topicoTopArea}>
                    <DisplayImageComponent />
                    <View style={styles.topicoTitle}>
                        <Text style={globalStyles.text}>{item.autor}</Text>
                        <Text style={styles.topicoAlterText}>{item.autorOcupacion}</Text>
                    </View>
                </View>
                <View style={styles.topicoMidArea}>
                    <View>
                        <Text style={styles.topicoTitleText}>{item.titulo}</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={styles.topicoText}>{item.mensaje}</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                        <CategoryBarComponentText text={item.curso} />
                    </View>
                    <View style={styles.line} />
                </View>
                <View style={styles.topicoBottomArea}>
                    <View style={styles.bottomIcon}>
                        {!noShowBottomIcons ? (
                            <View style={styles.bottomIcon}>
                                <Pressable onPress={() => handlePressReply(item, id_autor)}>
                                    <View style={styles.box}>
                                        <Text style={[styles.topicoText, { textAlign: 'center' }]}>Responder</Text>
                                    </View>
                                </Pressable>
                                <Text style={styles.topicoText}>Solucionado: </Text>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={require("../assets/images/noCompleteIcon.png")}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </Pressable>
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
        borderTopWidth: 1,
        borderColor: '#BCBCBC',
        width: '95%',
    },
    topicoBottomArea: {
        flex: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    bottomIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 8,
    },
    box: {
        width: 80,
        height: 20,
        backgroundColor: "#6B6B6B",
        borderColor: "#747171",
        borderRadius: 2,
    }
})