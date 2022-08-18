import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


type Props = {
    onPressed: () => void;
};

export default function WorkoutTaskListFooter({onPressed}: Props) {
    return (
        <TouchableOpacity
            onPress={onPressed}
            activeOpacity={0.8}
            style={styles.content}
        >
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,

        minHeight: 80,
        width: '100%',

        borderWidth: 4,
        borderColor: "springgreen",
        backgroundColor: "white",
    },
    text: {
        fontSize: 50,
        fontWeight: "400",
        color: "lime",
    }
});