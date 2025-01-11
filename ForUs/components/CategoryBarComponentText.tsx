import { Pressable, StyleSheet, Text } from "react-native";
import globalStyles from "../styles/globalStyles";

interface Props {
    text: string;
}

export default function CategoryBarComponentText({ text }: Props) {
    // Formato del texto
    const formatString = (input: string) => {
        return input.replace(/_/g, " ");
    }

    return (
        <Pressable style={styles.categoryButton}>
            <Text style={[globalStyles.text, { color: "#BCBCBC", fontSize: 9 }]}>{formatString(text)}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    categoryButton: {
        justifyContent: "center",
        width: "24%",
        height: 30,
        backgroundColor: "#6B6B6B",
        borderColor: "#747171",
        elevation: 10,
        borderRadius: 8,
        margin: 5,
    },
})