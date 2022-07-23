import { createContext, useReducer } from "react";

import { WorkoutTask } from "./WorkoutTask";


export interface WorkoutContextProps {
    //TODO save to persistent storage
    tasks: WorkoutTask[];
    setTasks: (tasks: WorkoutTask[]) => void;
    addWorkout: (task: WorkoutTask) => void;
    removeWorkout: (id: number) => void;

    idCounter: number;
}

const initialState: WorkoutContextProps = {
    tasks: [],
    setTasks: () => {},
    addWorkout: () => {},
    removeWorkout: () => {},

    idCounter: 0,
};

export const WorkoutContext = createContext(initialState);



interface WorkoutReducerActionSetTasks {
    type: "SET_TASKS";
    tasks: WorkoutTask[];
}

interface WorkoutReducerActionAddTask {
    type: "ADD_TASK";
    task: WorkoutTask;
}

interface WorkoutReducerActionRemoveTask {
    type: "REMOVE_TASK";
    id: number;
}

type WorkoutReducerAction = 
    WorkoutReducerActionSetTasks    |
    WorkoutReducerActionAddTask     | 
    WorkoutReducerActionRemoveTask;

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
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.tasks
            }
        default:
            return state;
    }
}




export function WorkoutContextProvider(props: {children: any}) {
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    function setTasks(tasks: WorkoutTask[]) {
        dispatch({type: "SET_TASKS", tasks: tasks});
    }
    function addWorkout(task: WorkoutTask) {
        dispatch({type: "ADD_TASK", task: task});
    }

    function removeWorkout(id: number) {
        dispatch({type: "REMOVE_TASK", id: id});
    }


    const value: WorkoutContextProps = {
        ...state,
        setTasks: setTasks,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}