import { Pressable, StyleSheet, Text } from "react-native";
import globalStyles from "../styles/globalStyles";
import { Curso } from "../src/api/CursoService";

interface Props {
    item: Curso;
    onSelectedCategory?: (idCurso: number) => void;
    isSelected: boolean;
}

export default function CategoryBarComponent({ item, onSelectedCategory, isSelected }: Props) {
    if (!item) return null; // Si item es undefined, no renderiza nada

    const handleAction = () => {
        console.log("Presiono");
        if(onSelectedCategory){
            onSelectedCategory(item.id);
        }
    }

    return (
        <Pressable 
            style={[styles.categoryButton, 
                isSelected ? styles.selected : styles.unselected,
            ]}
            onPress={handleAction}
        >
            <Text style={[globalStyles.text, 
                { color: isSelected ? "#FFFFFF" : "#BCBCBC", fontSize: 8 },
                ]}>{item.categoria}</Text>
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