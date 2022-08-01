import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";

import WorkoutTaskListItem from "./WorkoutTaskListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskList'>;

export default function WorkoutTaskList({route, navigation} : NavProps) {
    const focused = useIsFocused();
    const context = useContext(WorkoutContext);
    const storage = useWorkoutStorage();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await storage.loadWorkoutTasks();
            context.addTaskMultiple(tasks);
        };

        // do on component mount
        fetchTasks().catch(console.error);
    }, []);

    useEffect(() => {
        storage.saveWorkoutTasks(context.tasks);
    }, [context.tasks]);


    return (
        <View style={styles.content}>
            <View style={styles.listView}>
                <DraggableFlatList<string>
                    data={context.taskOrder}
                    onDragEnd={({data}) => context.setTaskOrder(data)}
                    keyExtractor={(item) => item}
                    renderItem={(params) =>
                        // IDs in the task order list are always checked if they belong to valid tasks
                        // so we can non-null assert here
                        <WorkoutTaskListItem 
                            task={context.findTask(params.item)!}
                            onPress={() => navigation.navigate("WorkoutTaskForm", {editedTask: context.findTask(params.item)})}
                            onLongPress={params.drag} 
                            disabled={params.isActive} />
                    }
                />
            </View>
            <View style={styles.addButtonBottomView}>
                {focused &&
                <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => {
                    navigation.navigate("WorkoutTaskForm", {editedTask: undefined});
                }}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "cyan",
    },
    listView: {
        flex: 9,
        alignItems: "stretch",
        marginTop: 50,
    },
    addButtonBottomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    //FIXME button changes shape as the listView changes height/vertargin
    addButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        marginBottom: 10,
        paddingHorizontal: 20,
        paddingBottom: 15,

        borderRadius: 10,

        elevation: 5,
        shadowRadius: 10,
        shadowOffset: {width: 10, height: 5},
        shadowColor: "black",

        backgroundColor: "white",
    },
    addButtonText: {
        color: "lawngreen",
        fontSize: 50,
        fontWeight: "bold",
        fontStyle: "normal",
    }
})