import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { WorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { StorageError } from "../storage/AsyncStorageSQL";
import { WorkoutSet } from "../types/WorkoutSet";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type Props = {
    workoutSetId: string;
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutSetListView">;
}

export default function WorkoutSetListItem({workoutSetId, navigation}: Props) {
    const context = React.useContext(WorkoutContext);
    const [workoutSet, setWorkoutSet] = React.useState<WorkoutSet | null>(null);
    const [workoutTasks, setWorkoutTasks] = React.useState<WorkoutTask[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const set = await context.storage.get("WorkoutSet", workoutSetId);
                const tasks = await context.storage.find("WorkoutTask", (task) => set.taskIds.includes(task.id));
    
                setWorkoutSet(set);
                setWorkoutTasks(tasks);
            } catch (error: any) {
                console.error(StorageError[error]);
            }
        }

        fetchData();
    }, []);

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
            if(workoutSet) {
                context.makeSetCurrent(workoutSet);
                navigation.navigate("WorkoutTaskList", {workoutSet: workoutSet});
            }
        }}>
            <View style={[styles.container, {backgroundColor: workoutSet !== null ? workoutSet.cardColor : "white"}]}>
                <Text style={styles.title}>{workoutSet !== null ? workoutSet.title : ""}</Text>
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