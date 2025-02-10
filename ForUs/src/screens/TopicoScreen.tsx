import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { Topico } from "../api/TopicoService";
import { RouteProp } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TopicoComponent from "../../components/TopicoComponent";
import globalStyles from "../../styles/globalStyles";

type RootStackParamList = {
    TopicoComponent: { topico: Topico };
}

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "TopicoComponent">;
    route: RouteProp<RootStackParamList, "TopicoComponent">;
}

export default function TopicoScreen({ route, navigation }: Props) {
    const { topico } = route.params; // Obtén el parámetro "topico"
    console.log("Topico seleccionado: ", topico);

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
            <ScrollView
                contentContainerStyle={globalStyles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[globalStyles.screen, { justifyContent: 'flex-start' }]}>
                    <View style={[globalStyles.topScreen, styles.topArea]}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name='arrow-left' size={50} color="#6B6B6B" />
                        </Pressable>
                    </View>
                    <View style={[globalStyles.inputArea, { justifyContent: 'flex-start' }]}>
                        <TopicoComponent item={topico} navigation={navigation} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    topArea: {
        flex: 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
})