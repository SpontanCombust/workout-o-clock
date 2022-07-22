import { Children, createContext, useReducer } from "react";

import WorkoutTask from "./WorkoutTask";


interface WorkoutContextProps {
    tasks: WorkoutTask[];
}

const initialState: WorkoutContextProps = {
    tasks: [],
};

export const WorkoutContext = createContext(initialState);



interface WorkoutReducerActionAddTask {
    type: "ADD_TASK";
    task: WorkoutTask;
}

interface WorkoutReducerActionRemoveTask {
    type: "REMOVE_TASK";
    id: number;
}

type WorkoutReducerAction = WorkoutReducerActionAddTask | WorkoutReducerActionRemoveTask;

function WorkoutReducer(state: WorkoutContextProps, action: WorkoutReducerAction): WorkoutContextProps {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state, 
                tasks: [...state.tasks, action.task]
            };
        case "REMOVE_TASK":
            return {
                ...state, 
                tasks: state.tasks.filter(task => task.id !== action.id)
            };
        default:
            return state;
    }
}




export function WorkoutContextProvider(props: {children: any}) {
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    function addWorkout(task: WorkoutTask) {
        dispatch({type: "ADD_TASK", task: task});
    }

    function removeWorkout(id: number) {
        dispatch({type: "REMOVE_TASK", id: id});
    }


    const value = {
        tasks: state.tasks,
        addWorkout,
        removeWorkout
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}