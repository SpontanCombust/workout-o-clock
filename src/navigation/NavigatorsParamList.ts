import { WorkoutTask } from "../types/WorkoutTask";

type NavigatorsParamList = {
    Home: undefined;
    WorkoutTaskList: undefined;
    WorkoutTaskForm: {
        editedTask?: WorkoutTask;
    };
    WorkoutTaskFormColorPicker: {
        oldColor: string,
        setColor: (s: string) => void,
    };
}

export default NavigatorsParamList;