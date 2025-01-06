import React from "react";
import { View, Text, TextInput } from "react-native";
import globalStyles from "../styles/globalStyles";

interface Props {
    text: string;
    value: string;
    variable: (text: string) => void;
}

export default function InputLargeText({ text, value, variable }: Props) {
    return (
        <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputText}>{text}</Text>
            <TextInput
                style={[globalStyles.input, {height: 200, padding: 10}]}
                multiline
                textAlignVertical="top"
                scrollEnabled
                value={value}
                onChangeText={variable}
            />
        </View>
    )
}