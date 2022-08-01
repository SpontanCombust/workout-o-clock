import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";

import { WorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";
import WorkoutPlaybackViewCardTime from "./WorkoutPlaybackViewCardTime";
import WorkoutPlaybackViewCardReps from "./WorkoutPlaybackViewCardReps";
import { View } from "react-native";


export type WorkoutPlaybackViewCardProps = {
    task: WorkoutTask;
    onTaskFinished: () => void;
}


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutPlaybackView">;

export default function WorkoutPlaybackView({navigation, route}: NavProps) {
    const context = useContext(WorkoutContext);
    
    if(route.params.currentTaskOrderIndex < 0 || route.params.currentTaskOrderIndex >= context.taskOrder.length) {
        navigation.navigate("WorkoutTaskList");
        //TODO add finish screen when task sets are implemented
        return <View/>;
    }

    const currentTask = context.findTask(context.taskOrder[route.params.currentTaskOrderIndex]);


    function nextTask() {
        navigation.replace("WorkoutPlaybackView", {
            currentTaskOrderIndex: route.params.currentTaskOrderIndex + 1
        });
    }
    
    if(currentTask === undefined) {
        nextTask();
    } else {
        const cardProps: WorkoutPlaybackViewCardProps = {
            task: currentTask,
            onTaskFinished: () => nextTask()
        };

        if(currentTask.completionCondition.type === CompletionConditionType.TIME ) {
            return <WorkoutPlaybackViewCardTime {...cardProps} />;
        } else {
            return <WorkoutPlaybackViewCardReps {...cardProps} />;
        }
    }
}