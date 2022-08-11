import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { WorkoutContext } from "../context/WorkoutContext";
import { WorkoutSet } from "../types/WorkoutSet";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type Props = {
    workoutSet: WorkoutSet;
    onPress: () => void;
}

export default function WorkoutSetListItem(props: Props) {
    const context = React.useContext(WorkoutContext);
    const tasks = props.workoutSet.taskIds
                    .map(id => context.findTask(id))
                    .filter((task): task is WorkoutTask => task !== undefined);

    function TaskSummaryItem(props: {task: WorkoutTask}) {
        let completionCond: string;
        if(props.task.completionCondition.type === CompletionConditionType.TIME) {
            completionCond = `${props.task.completionCondition.minutes}:${props.task.completionCondition.seconds}`;
        } else {
            completionCond = `${props.task.completionCondition.reps} reps`;
        }

        return (
            <View style={styles.taskSummaryItemView}>
                <Text style={styles.taskSummaryItemText}>{props.task.title} - {completionCond}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.container, {backgroundColor: props.workoutSet.cardColor}]}>
                <Text style={styles.title}>{props.workoutSet.title}</Text>
                <FlatList
                    data={tasks}
                    renderItem={({item}) => <TaskSummaryItem task={item} />}
                    scrollEnabled={false}
                />
            </View>
        </TouchableOpacity>
    )
}


const winSize = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        width: winSize.width * 0.9,
        marginVertical: winSize.height * 0.05,

        borderWidth: 4,
        backgroundColor: "white",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    taskSummaryItemView: {

    },
    taskSummaryItemText: {

    }
});