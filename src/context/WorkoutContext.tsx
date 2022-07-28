import { createContext, useReducer } from "react";

import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutContextProps {
    //TODO save to persistent storage
    // Don't reassign directly! Use add/removeTask
    tasks: WorkoutTask[];
    // Don't reassign directly! Use setTaskOrder
    taskOrder: number[]; // array od Ids

    addTask: (task: WorkoutTask) => void;
    removeTask: (id: number) => void;
    clearTasks: () => void;
    findTask: (id: number) => WorkoutTask | undefined;
    setTaskOrder: (order: number[]) => void;

    idCounter: number;
}

const initialState: WorkoutContextProps = {
    tasks: [],
    taskOrder: [],

    addTask: () => {},
    removeTask: () => {},
    clearTasks: () => {},
    findTask: () => undefined,
    setTaskOrder: () => {},

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
interface WorkoutReducerActionClearTasks {
    type: "CLEAR_TASKS";
}

interface WorkoutReducerActionSetTaskOrder {
    type: "SET_TASK_ORDER";
    order: number[];
}

type WorkoutReducerAction = 
    WorkoutReducerActionAddTask     | 
    WorkoutReducerActionRemoveTask  |
    WorkoutReducerActionClearTasks  |
    WorkoutReducerActionSetTaskOrder;

function WorkoutReducer(state: WorkoutContextProps, action: WorkoutReducerAction): WorkoutContextProps {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state, 
                tasks: [...state.tasks, action.task],
                taskOrder: [...state.taskOrder, action.task.id],
            };
        case "REMOVE_TASK":
            return {
                ...state, 
                tasks: state.tasks.filter(task => task.id !== action.id),
                taskOrder: state.taskOrder.filter(id => id !== action.id)
            };
        case "CLEAR_TASKS":
            return {
                ...state,
                tasks: [],
                taskOrder: [],
            }
        case "SET_TASK_ORDER":
            const validIds = action.order.filter(id => state.tasks.find(task => task.id == id) !== undefined);
            return {
                ...state,
                taskOrder: validIds
            }
        default:
            return state;
    }
}




export function WorkoutContextProvider(props: {children: any}) {
    const [state, dispatch] = useReducer(WorkoutReducer, initialState);

    function addTask(task: WorkoutTask) {
        dispatch({type: "ADD_TASK", task: task});
    }
    function removeTask(id: number) {
        dispatch({type: "REMOVE_TASK", id: id});
    }
    function clearTasks() {
        dispatch({type: "CLEAR_TASKS"});
    }
    function findTask(id: number): WorkoutTask | undefined {
        return state.tasks.find(task => task.id == id);
    }

    function setTaskOrder(order: number[]) {
        dispatch({type: "SET_TASK_ORDER", order: order});
    }



    const value: WorkoutContextProps = {
        ...state,
        addTask: addTask,
        removeTask: removeTask,
        clearTasks: clearTasks,
        findTask: findTask,
        setTaskOrder: setTaskOrder,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}