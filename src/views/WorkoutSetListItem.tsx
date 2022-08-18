import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type Props = {
    workoutSet: WorkoutSet;
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutSetListView">;
}

export default function WorkoutSetListItem({workoutSet, navigation}: Props) {
    const storage = useWorkoutStorage();
    const [workoutTasks, setWorkoutTasks] = useState<WorkoutTask[]>([]);


    useEffect(() => {
        storage.getMultiple("WorkoutTask", workoutSet.taskIds)
        .then(data => setWorkoutTasks(data));
    }, [workoutSet]);


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
        <TouchableOpacity onPress={() => {
            navigation.navigate("WorkoutTaskList", {workoutSetId: workoutSet.id});
        }}>
            <View style={[styles.container, {backgroundColor: workoutSet !== undefined ? workoutSet.cardColor : "white"}]}>
                <Text style={styles.title}>{workoutSet !== undefined ? workoutSet.title : ""}</Text>
                <FlatList<WorkoutTask>
                    data={workoutTasks}
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