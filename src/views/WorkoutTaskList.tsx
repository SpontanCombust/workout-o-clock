import React, { useContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WorkoutContext } from "../context/WorkoutContext";

import { WorkoutTask } from "../types/WorkoutTask";
import WorkoutTaskForm from "./WorkoutTaskForm";
import WorkoutTaskListItem from "./WorkoutTaskListItem";


export default function WorkoutTaskList() {
    const [formVisible, setFormVisible] = useState(false);
    const context = useContext(WorkoutContext);

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

                <DraggableFlatList<WorkoutTask>
                    data={context.tasks}
                    onDragEnd={({data}) => context.setTasks(data)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(params) =>
                        <WorkoutTaskListItem task={params.item} onLongPress={params.drag} disabled={params.isActive} />
                    }
                />
            </View>
            <View style={styles.addButtonBottomView}>
                {!formVisible &&
                <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => setFormVisible(!formVisible)}>
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