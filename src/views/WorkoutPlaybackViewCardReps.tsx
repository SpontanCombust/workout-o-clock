import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CompletionConditionType } from "../types/WorkoutTask";

import { WorkoutPlaybackViewCardProps } from "./WorkoutPlaybackView";


export default function WorkoutPlaybackViewCardReps(props: WorkoutPlaybackViewCardProps) {
    return (
        <View style={[styles.container, {backgroundColor: props.task.cardColor}]}>
            <Text style={styles.title}>{props.task.title}</Text>
            <View style={styles.repsCountView}>
                <Text style={styles.repsCount}>{props.task.completionCondition.type == CompletionConditionType.REPS ? props.task.completionCondition.reps : 0}</Text>
                <Text style={styles.repsCountFooter}>Reps</Text>
            </View>
            <Pressable style={styles.doneButton} onPress={() => props.onTaskFinished()}>
                <Text style={styles.doneButtonText}>Done!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        flex: 1,
        justifyContent: "center",

        marginTop: 50,

        fontSize: 40,
        fontWeight: "bold",
    },
    repsCountView: {
        flex: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    repsCount: {
        fontSize: 150,
        fontWeight: "300",
    },
    repsCountFooter: {
        fontSize: 30,
        fontWeight: "300",
    },
    doneButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
        paddingVertical: 5,
        width: "100%",

        backgroundColor: "lime",
    },
    doneButtonText: {
        fontSize: 30,
    },
});