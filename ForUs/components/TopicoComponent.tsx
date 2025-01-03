import { View, Text, StyleSheet, Image } from "react-native";
import DisplayImageComponent from "./DisplayImageComponent";
import globalStyles from "../styles/globalStyles";
import CategoryBarComponent from "./CategoryBarComponent";
import { Topico } from "../src/api/TopicoService";

interface Props {
    item: Topico;
}

export default function TopicoComponent({ item }: Props) {
    return (
        <View style={styles.topico}>
            <View style={styles.topicoTopArea}>
                <DisplayImageComponent />
                <View style={styles.topicoTitle}>
                    <Text style={globalStyles.text}>{item.autor}</Text>
                    <Text style={{ color: '#BCBCBC' }}></Text>
                </View>
            </View>
            <View style={styles.topicoMidArea}>
                <View>
                    <Text style={styles.topicoTitleText}>{item.titulo}</Text>
                </View>
                <View style={{ paddingVertical: 5}}>
                    <Text style={styles.topicoText}>{item.mensaje}</Text>
                </View>
                <View style={{ paddingVertical: 5 }}>
                    <CategoryBarComponent text={item.curso} />
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#BCBCBC', width: '92%', }} />
            </View>
            <View style={styles.topicoBottomArea}>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    <Text style={styles.topicoText}>Solucionado: </Text>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require("../assets/images/noCompleteIcon.png")}
                    />
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
    topicoTitle: {
        paddingHorizontal: 10
    },
    topicoMidArea: {
        flex: 2,
        paddingLeft: 10,
    },
    topicoBottomArea: {
        flex: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 40,
    }
})