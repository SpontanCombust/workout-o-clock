import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";

import WorkoutTaskListFooter from "./WorkoutTaskListFooter";
import WorkoutTaskListItem from "./WorkoutTaskListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskList'>;

export default function WorkoutTaskList({route, navigation} : NavProps) {
    const focused = useIsFocused();
    const context = useContext(WorkoutContext);

    useEffect(() => {
        // do on component mount
        context.loadFromStorage().catch(console.error);
    }, []);


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
                    ListFooterComponent={<WorkoutTaskListFooter onPress={() => navigation.navigate("WorkoutTaskForm", {})}/>}
                />
            </View>
            <View style={styles.bottomButtonsView}>
                {focused && <>                   
                    <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => {
                        navigation.navigate("WorkoutPlaybackView", {currentTaskOrderIndex: 0});
                    }}>
                        {/*TODO set content as svg arrow image*/}
                        <Text style={styles.addButtonText}>{">"}</Text>
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
        backgroundColor: "cyan",
    },
    listView: {
        flex: 8,
        alignItems: "stretch",
        marginTop: 50,
    },
    bottomButtonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        marginTop: 5, 

        backgroundColor: "white",
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,

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
    addButtonText: {
        color: "lawngreen",
        fontSize: 80,
        fontWeight: "bold",
        fontStyle: "normal",

        position: "absolute",
        top: -25,
    }
})