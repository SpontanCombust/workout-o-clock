import React, { useContext } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { fromHsv, toHsv } from "react-native-color-picker";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import SwipeableItem from 'react-native-swipeable-item'
import { WorkoutContext } from "../context/WorkoutContext";

import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


export default function WorkoutTaskListItem(props: {
    task: WorkoutTask;
    onPress: () => void;
    onLongPress: () => void;
    disabled: boolean;
}) {
    const context = useContext(WorkoutContext);

    let movingCardColor = toHsv(props.task.cardColor);
    movingCardColor.v -= 0.1;
    
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

    function UnderlayDeleteItem() : JSX.Element {
        return (
            <View style={styles.underlayItemView}>
                <TouchableWithoutFeedback onPress={() => context.removeTask(props.task.id)}>
                    <Text style={styles.underlayItemText}>DELETE</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
    <ScaleDecorator>
        <SwipeableItem<WorkoutTask>
            item={props.task}
            renderUnderlayLeft={() => <UnderlayDeleteItem/>}
            snapPointsLeft={[150]}
            activationThreshold={10}
        >
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                disabled={props.disabled}
                style={[
                    styles.content,
                    props.disabled ? {backgroundColor: fromHsv(movingCardColor)} : {backgroundColor: props.task.cardColor},
                ]}
            >
                <Text style={styles.titleText}>{props.task.title}</Text>
                {CompletionConditionView()}
            </TouchableOpacity>
        </SwipeableItem>
    </ScaleDecorator>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",

        paddingLeft: 40,
        paddingVertical: 10,
        minHeight: 90,
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
    },
    underlayItemView: {
        backgroundColor: "red", 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "flex-end",
        paddingRight: 40
    },
    underlayItemText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    }
})