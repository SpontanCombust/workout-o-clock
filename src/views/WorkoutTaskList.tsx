import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WorkoutContext } from "../context/WorkoutContext";
import { useWorkoutStorage } from "../storage/WorkoutStorage";

import WorkoutTaskForm from "./WorkoutTaskForm";
import WorkoutTaskListItem from "./WorkoutTaskListItem";


export default function WorkoutTaskList() {
    const [formVisible, setFormVisible] = useState(false);
    const context = useContext(WorkoutContext);
    const storage = useWorkoutStorage();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await storage.loadWorkoutTasks();
            context.addTaskMultiple(tasks);
        };
        const sendTasks = async () => {
            await storage.saveWorkoutTasks(context.tasks);
        };

        // do on component mount
        fetchTasks().catch(console.error);

        return () => {
            // do on component unmount
            //FIXME doesn't save on unmount
            sendTasks().catch(console.error);
        };

    }, []);


    return (
        <View style={styles.content}>
            <View style={styles.listView}>
                <Modal
                    visible={formVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setFormVisible(false)}
                >
                    <WorkoutTaskForm onRequestClose={() => setFormVisible(false)}/>
                </Modal>

                <DraggableFlatList<string>
                    data={context.taskOrder}
                    onDragEnd={({data}) => context.setTaskOrder(data)}
                    keyExtractor={(item) => item}
                    renderItem={(params) =>
                        // IDs in the task order list are always checked if they belong to valid tasks
                        // so we can non-null assert here
                        <WorkoutTaskListItem task={context.findTask(params.item)!} onLongPress={params.drag} disabled={params.isActive} />
                    }
                />
            </View>
            <View style={styles.addButtonBottomView}>
                {!formVisible &&
                <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => setFormVisible(!formVisible)}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>}
            </View>

            {/*TODO delete debug buttons when done*/}
            <Button title="Delet dis" onPress={() => {
                context.clearTasks();
                storage.clear();
            }}/>
            <Button title="Save dis" onPress={() => {
                storage.saveWorkoutTasks(context.tasks);
            }}/>
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