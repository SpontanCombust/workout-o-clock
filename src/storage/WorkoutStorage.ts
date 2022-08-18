import { WorkoutSet } from "../types/WorkoutSet";
import { WorkoutTask } from "../types/WorkoutTask";
import { Storage } from './AsyncStorageSQL';


export type WorkoutStorageConfig = {
    WorkoutTask: WorkoutTask,
    WorkoutSet: WorkoutSet,
}

const WorkoutStorageInstance = new Storage<WorkoutStorageConfig>();

export function useWorkoutStorage() {
    return WorkoutStorageInstance;
}