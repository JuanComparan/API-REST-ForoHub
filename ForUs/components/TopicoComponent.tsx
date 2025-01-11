import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import DisplayImageComponent from "./DisplayImageComponent";
import globalStyles from "../styles/globalStyles";
import { Topico } from "../src/api/TopicoService";
import CategoryBarComponentText from "./CategoryBarComponentText";
interface Props {
    item: Topico;
    navigation: StackNavigationProp<any>;
}

export default function TopicoComponent({ item, navigation }: Props) {

    // Pendiente Funcion para recibir parametros y colocarlos de ser asi
    //const handlePress = (item: Topico) => {
    //    console.log("Presiono el topico");
    //    navigation.navigate("TopicoScreen", {
    //        topico: item
    //    })
    //}
    
    // Pendiente Funcion para recibir parametros y colocarlos de ser asi
    const handlePress = () => {
        console.log("Presiono el topico");
        navigation.navigate("CreateReply");
    }

    return (
        <Pressable onPress={handlePress}>
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
                    <View style={{ flexDirection: 'row', paddingVertical: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.topicoText}>Solucionado: </Text>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require("../assets/images/noCompleteIcon.png")}
                        />
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
        width: '92%',
    },
    topicoBottomArea: {
        flex: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 40,
    }
})