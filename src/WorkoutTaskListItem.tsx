import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CompletionConditionType, WorkoutTask } from "./WorkoutTask";


export default function WorkoutTaskListItem(props: {
    task: WorkoutTask;
    onLongPress: () => void;
    disabled: boolean;
}) {
    
    function CompletionConditionView() : JSX.Element {
        if(props.task.completionCondition.type == CompletionConditionType.TIME) {
            return <View style={{flexDirection: "row"}}>
                <Text style={styles.completionConditionText}>
                    {props.task.completionCondition.minutes.toString().padStart(2, "0")
                    + " : " + 
                    props.task.completionCondition.seconds.toString().padStart(2, "0")}
                </Text>
            </View>
        } else {
            return <View style={{flexDirection: "row"}}>
                <Text style={styles.completionConditionText}>
                    {props.task.completionCondition.reps + " reps"}
                </Text>
            </View>
        }
    }

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
            {CompletionConditionView()}
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
    completionConditionText: {
        fontSize: 30,
        color: "black",
        fontWeight: "200"
    }
})