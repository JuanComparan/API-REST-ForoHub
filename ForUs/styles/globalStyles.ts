import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    // Pantalla 
    screen: {
        flex: 1,
        justifyContent: "center",
    },
    topScreen: {
        flex: 1,
        alignItems: "center", // Centra la imagen y el texto
        marginTop: 50,
        marginBottom: 20, // Espaciado entre la imagen y los inputs
    },
    inputArea: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    buttonArea: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    // Contenedores
    inputContainer: {
        marginBottom: 15,
    },
    scrollContainer: {
        flexGrow: 1, // Hace que el ScrollView ocupe todo el espacio
        justifyContent: "center",
    },
    // Texto
    inputText: {
        fontSize: 20,
        fontWeight: "medium",
        color: "#ffffff",
        marginBottom: 5,
        paddingLeft: 35,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
    },
    title: {
        fontSize: 44,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center',
    },
    // Botones
        input: {
            alignSelf: "center",
            width: '80%',
            backgroundColor: "#8E8E8E",
            borderColor: "#787777",
            borderRadius: 8,
            padding: 10,
            fontSize: 18,
            color: "#ffffff"
        },
    button: {
        alignSelf: "center",
        justifyContent: "center",
        width: "70%",
        height: 50,
        backgroundColor: "#7D7B7B",
        borderColor: "#747171",
        borderRadius: 4,
        margin: 5,
    },
})

export default globalStyles;