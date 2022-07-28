import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutStorage {
    saveWorkoutTasks: (tasks: WorkoutTask[]) => Promise<void>;
    loadWorkoutTasks: () => Promise<WorkoutTask[]>;

    clear: () => Promise<void>;
}

const KEY_WORKOUT_TASKS = "@workout-o-clock_workoutTasks";

export const useWorkoutStorage = (): WorkoutStorage => {
    const saveWorkoutTasks = async (tasks: WorkoutTask[]) => {
        try {
            await AsyncStorage.setItem(KEY_WORKOUT_TASKS, JSON.stringify(tasks));  
        } catch (error) {
            console.log(error);
        }
    }

    const loadWorkoutTasks = async () => {
        try {
            const tasks = await AsyncStorage.getItem(KEY_WORKOUT_TASKS);
            if (tasks) {
                return JSON.parse(tasks);
            }
            return [];
        } catch (error) {
            console.log(error);
        }
    }

    const clear = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        saveWorkoutTasks: saveWorkoutTasks,
        loadWorkoutTasks: loadWorkoutTasks,
        clear: clear,
    }
}
