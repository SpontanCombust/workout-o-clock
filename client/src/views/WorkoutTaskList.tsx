import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";
import { WorkoutTask } from "../types/WorkoutTask";
import WorkoutTaskListFooter from "./WorkoutTaskListFooter";
import WorkoutTaskListItem from "./WorkoutTaskListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskList'>;

export default function WorkoutTaskList({route, navigation} : NavProps) {
    const storage = useWorkoutStorage();

    const [tasksAreLoading, setTasksLoading] = useState(true);
    const [isFormVisible, setFormVisible] = useState(false);

    const workoutSet = useRef<WorkoutSet>();
    const [workoutTasks, setWorkoutTasks] = useState<WorkoutTask[]>([]);

    //FIXME avoid full reloads when editing tasks
    useFocusEffect(
        useCallback(() => {
            setTasksLoading(true);
            setFormVisible(false);

            storage.get("WorkoutSet", route.params.workoutSetId)
            .then(set => {
                workoutSet.current = set;

                navigation.setOptions({
                    headerTitle: set.title,
                });

                storage.getMultiple("WorkoutTask", set.taskIds)
                .then(tasks => {
                    setWorkoutTasks(tasks);
                    setTasksLoading(false);
                });
            });
        }, [])
    );

    function reorderTasks(tasks: WorkoutTask[]) {
        if(workoutSet.current !== undefined) {
            const updatedSet: WorkoutSet = {
                ...workoutSet.current,
                taskIds: tasks.map(task => task.id),
            }
    
            storage.update("WorkoutSet", updatedSet.id, updatedSet);

            setWorkoutTasks(tasks);
        }
    }

    function deleteTask(taskId: string) {
        const task = workoutTasks.find(t => t.id === taskId);
        if(task !== undefined) {
            storage.delete("WorkoutTask", taskId);
                        
            storage.get("WorkoutSet", task.setId)
            .then(set => {
                set.taskIds = set.taskIds.filter(id => id !== taskId);
                storage.update("WorkoutSet", task.setId, set);
            });

            setWorkoutTasks(workoutTasks.filter(t => t.id !== taskId));
        }
    }

    return (
        <View style={[styles.content, {backgroundColor: workoutSet.current?.cardColor}]}>
            <View style={styles.listView}>
                {tasksAreLoading
                ? <ActivityIndicator size={"large"} color="white" style={{marginTop: 30}}/>
                : <DraggableFlatList<WorkoutTask>
                    data={workoutTasks}
                    onDragEnd={({data}) => reorderTasks(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={(params) =>
                        <WorkoutTaskListItem 
                            navigation={navigation}
                            task={params.item}
                            disabled={params.isActive} 
                            activateDrag={params.drag} 
                            onRequestDelete={() => deleteTask(params.item.id)}/>
                    }
                    ListFooterComponent={<WorkoutTaskListFooter onPressed={() => {
                        setFormVisible(true);
                        navigation.navigate("WorkoutTaskForm", {setId: route.params.workoutSetId});
                    }}/>}
                />
                }
            </View>
            <View style={[styles.bottomButtonsView, {backgroundColor: workoutSet.current?.cardColor}]}>
                {!isFormVisible && workoutTasks.length > 0 && <>                   
                    <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => {
                        navigation.navigate("WorkoutPlaybackView", {tasks: workoutTasks, currentTaskIndex: 0});
                    }}>
                        <Ionicons name="play" size={50} color="lawngreen"/>
                    </TouchableOpacity>
                </>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",
    },
    listView: {
        flex: 8,
        alignItems: "stretch",
    },
    bottomButtonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 5,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",

        paddingLeft: 5,
        paddingTop: 3,

        width: 70,
        height: 70,
        
        borderColor: "lawngreen",
        borderWidth: 1,
        borderRadius: 10,

        elevation: 5,
        shadowRadius: 5,
        shadowOffset: {width: 3, height: 5},
        shadowColor: "black",

        backgroundColor: "white",
    },
})