import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import NavigatorsParamList from "../navigation/NavigatorsParamList";


type Props = {
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutTaskList">;
};

export default function WorkoutTaskListFooter({navigation}: Props) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("WorkoutTaskForm", {})}
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