import React from "react";
import { View, Text, TextInput } from "react-native";
import globalStyles from "../styles/globalStyles";

interface Props {
    text: string;
}

export default function InputComponent({ text }: Props) {
    return (
        <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputText}>{text}</Text>
            <TextInput style={globalStyles.input}/>
        </View>
    )
}