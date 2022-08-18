import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { fromHsv, toHsv } from "react-native-color-picker";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import SwipeableItem from 'react-native-swipeable-item';

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type Props = {
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutTaskList">;  
    task: WorkoutTask;
    disabled: boolean;
    activateDrag: () => void;
    onRequestDelete: () => void;
};

export default function WorkoutTaskListItem(props : Props) {
    function darkenColor(color: string, amount: number) {
        const hsv = toHsv(color);
        hsv.v -= amount;
        return fromHsv(hsv);
    }
    
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
                <TouchableWithoutFeedback onPress={props.onRequestDelete}>
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
                onPress={() => props.navigation.navigate("WorkoutTaskForm", {setId: props.task.setId, editedTask: props.task})}
                onLongPress={props.activateDrag}
                disabled={props.disabled}
                style={[
                    styles.content,
                    props.disabled ? {backgroundColor: darkenColor(props.task.cardColor, 0.1)} : {backgroundColor: props.task.cardColor},
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