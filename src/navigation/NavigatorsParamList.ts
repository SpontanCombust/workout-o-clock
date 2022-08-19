import { WorkoutSet } from "../types/WorkoutSet";
import { WorkoutTask } from "../types/WorkoutTask";

type NavigatorsParamList = {
    // Home: undefined;
    WorkoutTaskList: {
        workoutSetId: string,
    };
    WorkoutTaskForm: {
        setId: string,
        editedTask?: WorkoutTask;
    };
    WorkoutTaskFormColorPicker: {
        oldColor: string,
        setColor: (s: string) => void,
    };
    WorkoutPlaybackView: {
        tasks: WorkoutTask[];
        currentTaskIndex: number;
    }
    WorkoutPlaybackFinishView: undefined;
    WorkoutSetListView: undefined;
    WorkoutSetForm: {
        editedSet?: WorkoutSet;
    };
}

export default NavigatorsParamList;