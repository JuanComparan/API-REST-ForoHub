import { LinearGradient } from "expo-linear-gradient";

export default function Home () {
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
        </LinearGradient>
    )
}