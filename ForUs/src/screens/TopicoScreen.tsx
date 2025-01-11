import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import TopicoComponent from "../../components/TopicoComponent";
import { Topico } from "../api/TopicoService";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    TopicoComponent: {topico: Topico};
}

interface Props {
    item: Topico;
    navigation: StackNavigationProp<RootStackParamList, "TopicoComponent">;
    route: RouteProp<RootStackParamList, "TopicoComponent">;
}

export default function TopicoScreen({ item, navigation }: Props) {
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
            <TopicoComponent item={item} navigation={navigation}/>
        </LinearGradient>
    )
}