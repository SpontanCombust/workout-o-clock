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
    WorkoutSetForm: undefined;
}

export default NavigatorsParamList;