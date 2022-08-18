import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";
import WorkoutPlaybackViewCardReps from "./WorkoutPlaybackViewCardReps";
import WorkoutPlaybackViewCardTime from "./WorkoutPlaybackViewCardTime";


export type WorkoutPlaybackViewCardProps = {
    task: WorkoutTask;
    onTaskFinished: () => void;
}

type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutPlaybackView">;

export default function WorkoutPlaybackView({navigation, route}: NavProps) {
    const currentTask = route.params.tasks[route.params.currentTaskIndex];
    
    if(currentTask !== undefined) {
        const cardProps: WorkoutPlaybackViewCardProps = {
            task: currentTask,
            onTaskFinished: () => {
                if(route.params.currentTaskIndex + 1 < route.params.tasks.length) {
                    navigation.replace("WorkoutPlaybackView", {
                        tasks: route.params.tasks,
                        currentTaskIndex: route.params.currentTaskIndex + 1,
                    });
                } else {
                    navigation.replace("WorkoutPlaybackFinishView");
                }
            }
        };

        if(currentTask.completionCondition.type === CompletionConditionType.TIME ) {
            return <WorkoutPlaybackViewCardTime {...cardProps} />;
        } else {
            return <WorkoutPlaybackViewCardReps {...cardProps} />;
        }
    }

    navigation.goBack();
    return null;
}