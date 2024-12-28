import React from "react";
import { View, Text, TextInput } from "react-native";
import globalStyles from "../styles/globalStyles";

interface Props {
    text: string;
}

export default function InputPasswordComponent({ text }: Props) {
    return (
        <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputText}>{text}</Text>
            <TextInput style={globalStyles.input} secureTextEntry={true}/>
        </View>
    )
}