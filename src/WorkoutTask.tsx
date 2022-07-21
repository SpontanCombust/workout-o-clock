import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WorkoutTaskProps {
    backgroundColor: string;
    title: string;
    time: {countdown: boolean, seconds?: number};
}

export default function WorkoutTask(props: WorkoutTaskProps) {
    return (
    <View style={[styles.content, {backgroundColor: props.backgroundColor}]}>
        <Text style={styles.titleText}>{props.title}</Text>
        {props.time.countdown && <Text style={styles.timeText}>{props.time.seconds}</Text>}
    </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    timeText: {
        fontSize: 20,
        color: "white"
    }
})