import { Pressable, StyleSheet, Text } from "react-native";
import globalStyles from "../styles/globalStyles";
import { useState } from "react";

interface Props {
    text: string;
    solucion?: (solucion: string) => void;
}

export default function SolutionBoxComponent({ text, solucion }: Props) {
    const [bandera, setBandera] = useState<boolean>(false); // Estado para manejar la bandera

    const handleAction = () => {
        // Alterna el estado de bandera
        setBandera((prev) => !prev);

        // Ajusta el estado de solución en función del nuevo estado
        if (bandera) {
            solucion("SIN_SOLUCION_AUN");
        } else {
            solucion("NO_TIENE_SOLUCION");
        }
    };

    return (
        <Pressable
            style={[styles.categoryButton,
                bandera ? styles.selected : styles.unselected,
            ]}
            onPress={handleAction}>
            <Text style={[globalStyles.text, { color: bandera ? "#FFFFFf" : "#BCBCBC", fontSize: 9 }]}>{text}</Text>
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
    selected: {
        backgroundColor: "#CDB388", // Color para categoría seleccionada
        width: "26%",
        height: 35,
    },
    unselected: {
        backgroundColor: "#6B6B6B", // Color para categoría no seleccionada
    },
})