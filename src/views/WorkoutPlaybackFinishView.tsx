import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import NavigatorsParamList from "../navigation/NavigatorsParamList";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutPlaybackFinishView">;

export default function WorkoutPlaybackFinishView({navigation} : NavProps) {
    return (
        <View style={styles.content}>
            <Text style={styles.finishedText}>Workout finished!</Text>
            <Button title="Go back" onPress={() => navigation.replace("WorkoutTaskList")}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "springgreen",
    },
    finishedText: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 30,
    }
});