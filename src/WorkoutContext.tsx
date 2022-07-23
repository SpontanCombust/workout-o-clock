import { createContext, useReducer } from "react";

import { WorkoutTask } from "./WorkoutTask";


export interface WorkoutContextProps {
    tasks: WorkoutTask[];
    addWorkout: (task: WorkoutTask) => void;
    removeWorkout: (id: number) => void;

    idCounter: number;
}

const initialState: WorkoutContextProps = {
    tasks: [],
    addWorkout: () => {},
    removeWorkout: () => {},

    idCounter: 0,
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


    const value: WorkoutContextProps = {
        tasks: state.tasks,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout,
        idCounter: state.idCounter,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}