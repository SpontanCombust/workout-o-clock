import { WorkoutSet } from "../types/WorkoutSet";
import { WorkoutTask } from "../types/WorkoutTask";

type NavigatorsParamList = {
    // Home: undefined;
    WorkoutTaskList: {
        workoutSet: WorkoutSet,
    };
    WorkoutTaskForm: {
        editedTask?: WorkoutTask;
    };
    WorkoutTaskFormColorPicker: {
        oldColor: string,
        setColor: (s: string) => void,
    };
    WorkoutPlaybackView: {
        currentTaskIndex: number;
    }
    WorkoutPlaybackFinishView: undefined;
    WorkoutSetListView: undefined;
    WorkoutSetForm: undefined;
}

export default NavigatorsParamList;