import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type Props = {
    workoutSet: WorkoutSet;
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutSetListView">;
    onDeleteSet: () => void;
}

export default function WorkoutSetListItem({workoutSet, navigation, onDeleteSet}: Props) {
    const storage = useWorkoutStorage();
    const [workoutTasks, setWorkoutTasks] = useState<WorkoutTask[]>([]);


    useEffect(() => {
        storage.getMultiple("WorkoutTask", workoutSet.taskIds)
        .then(data => setWorkoutTasks(data));
    }, [workoutSet]);


    function TaskSummaryItem(props: {task: WorkoutTask}) {
        let completionCond: string;
        if(props.task.completionCondition.type === CompletionConditionType.TIME) {
            completionCond = 
                `${props.task.completionCondition.minutes.toString().padStart(2, "0")}:` +
                `${props.task.completionCondition.seconds.toString().padStart(2, "0")}`;
        } else {
            completionCond = `${props.task.completionCondition.reps} reps`;
        }

        return (
            <View style={styles.taskSummaryItemView}>
                <Text style={styles.taskSummaryItemText}>{props.task.title.padStart(20)} - {completionCond.padEnd(20)}</Text>
            </View>
        )
    }

    function onRequestEditSet() {
        navigation.navigate("WorkoutSetForm", {editedSet: workoutSet})
    }

    function onRequestDeleteSet() {
        Alert.alert(
            "Workout set deletion",
            `Are you sure you want to delete workout set "${workoutSet.title}"?`,
            [
                {
                    text: "Yes",
                    onPress: onDeleteSet,
                    style: "default",
                },
                {
                    text: "No",
                    style: "cancel",
                }
            ]
        );
    }

    return (
        //FIXME change opacity only on short *tap*, not on every touch
        <TouchableOpacity onPress={() => {
            navigation.navigate("WorkoutTaskList", {workoutSetId: workoutSet.id});
        }}>
            <View style={[styles.container, {backgroundColor: workoutSet.cardColor}]}>
                <View style={styles.setOverviewView}>
                    <Text style={styles.title}>{workoutSet.title}</Text>
                    <FlatList<WorkoutTask>
                        data={workoutTasks}
                        renderItem={({item}) => <TaskSummaryItem task={item} />}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.setEditionView}>
                    <TouchableOpacity activeOpacity={0.70} onPress={onRequestEditSet}>
                        <Feather name="edit" size={45} color="white"/>
                    </TouchableOpacity>
                    <View style={{width: 15}}/>
                    <TouchableOpacity activeOpacity={0.70} onPress={onRequestDeleteSet}>
                        <Feather name="trash" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const winSize = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        width: winSize.width * 0.9,
        marginTop: winSize.height * 0.05,

        borderWidth: 4,
        borderColor: "white",
        backgroundColor: "white",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",

        marginBottom: 15,
    },
    taskSummaryItemView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 2,
    },
    taskSummaryItemText: {
        fontWeight: "300",
        fontSize: 20,
    },
    setOverviewView: {
        flex: 9,
        alignItems: "center",
    },
    setEditionView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        
        width: "90%",
        marginBottom: 20,
    },
});