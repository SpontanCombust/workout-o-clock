import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CompletionConditionType } from "../types/WorkoutTask";

import { WorkoutPlaybackViewCardProps } from "./WorkoutPlaybackView";


export default function WorkoutPlaybackViewCardTime(props: WorkoutPlaybackViewCardProps) {
    const [secondsLeft, setSecondsLeft] = useState(
        props.task.completionCondition.type === CompletionConditionType.TIME 
        ? props.task.completionCondition.minutes * 60 + props.task.completionCondition.seconds 
        : 0
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(secondsLeft <= 0) {
            props.onTaskFinished();
        }
    }, [secondsLeft]);


    function timeText() {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return (
        <View style={[styles.container, {backgroundColor: props.task.cardColor}]}>
            <Text style={styles.title}>{props.task.title}</Text>
            <View style={styles.timeView}>
                <Text style={styles.time}>{timeText()}</Text>
            </View>
            <TouchableOpacity 
            activeOpacity={0.2} 
            style={[styles.skipButton, {backgroundColor: props.task.cardColor}]} 
            onPress={() => setSecondsLeft(0)}>
                <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
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
    timeView: {
        flex: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        fontSize: 130,
        fontWeight: "200",
    },
    skipButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
        paddingVertical: 5,
        marginBottom: 20,
        width: "60%",

        borderWidth: 3,
        borderRadius: 50,
        borderColor: "black",
    },
    skipButtonText: {
        fontSize: 30,
        fontWeight: "500",
    },
});