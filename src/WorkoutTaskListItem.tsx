import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";

import WorkoutTask from "./WorkoutTask";


export default function WorkoutTaskListItem(props: {
    task: WorkoutTask;
    onLongPress: () => void;
    disabled: boolean;
}) {
    return (
    <ScaleDecorator>
        <TouchableOpacity
            activeOpacity={1.0}
            onLongPress={props.onLongPress}
            disabled={props.disabled}
            style={[
                styles.content,
                props.disabled ? styles.contentDisabled : styles.contentEnabled,
            ]}
        >
            <Text style={styles.titleText}>{props.task.title}</Text>
            {props.task.hasCountdown && 
            <View style={{flexDirection: "row"}}>
                <Text style={styles.timeText}>{props.task.countdownMinutes !== undefined ? props.task.countdownMinutes : "00"}</Text>
                <Text style={styles.timeText}> : </Text>
                <Text style={styles.timeText}>{props.task.countdownSeconds !== undefined ? props.task.countdownSeconds : "00" }</Text>
            </View>}
        </TouchableOpacity>
    </ScaleDecorator>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",

        paddingLeft: 40,
        paddingVertical: 10,
    },
    contentDisabled: {
        backgroundColor: "mediumspringgreen",
    },
    contentEnabled: {
        backgroundColor: "springgreen",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    timeText: {
        fontSize: 30,
        color: "black",
        fontWeight: "200"
    }
})