import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/globalStyles";

export default function SearchBarComponent() {
    return (
        <Pressable style={styles.searchBar}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Image
                        style={styles.iconImage}
                        source={require("../assets/images/searchIcon.png")}
                    />
                </View>
                <View style={{ marginRight: 10 }}>
                    <Text style={[globalStyles.text, { color: "#BCBCBC" }]}>Buscar topico</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
        backgroundColor: "#6B6B6B",
        borderColor: "#747171",
        borderRadius: 8,
        margin: 5,
    },
    iconImage: {
        width: 35,
        height: 35,
    }
})