import { WorkoutTask } from "../types/WorkoutTask";
import { Storage } from './AsyncStorageSQL';


export type WorkoutStorageConfig = {
    WorkoutTask: WorkoutTask,
}

export type WorkoutStorage = Storage<WorkoutStorageConfig>;