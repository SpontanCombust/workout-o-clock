import { createContext, useReducer } from "react";

import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutContextProps {
    // Don't reassign directly! Use add/removeTask
    tasks: WorkoutTask[];
    // Don't reassign directly! Use setTaskOrder
    taskOrder: string[]; // array od UUIDs

    addTask: (task: WorkoutTask) => void;
    addTaskMultiple: (tasks: WorkoutTask[]) => void;
    updateTask: (uuid: string, task: WorkoutTask) => void;
    removeTask: (uuid: string) => void;
    clearTasks: () => void;
    findTask: (uuid: string) => WorkoutTask | undefined;
    setTaskOrder: (order: string[]) => void;
}

const initialState: WorkoutContextProps = {
    tasks: [],
    taskOrder: [],

    addTask: () => {},
    addTaskMultiple: () => {},
    updateTask: () => {},
    removeTask: () => {},
    clearTasks: () => {},
    findTask: () => undefined,
    setTaskOrder: () => {},
};

export const WorkoutContext = createContext(initialState);



interface WorkoutReducerActionAddTask {
    type: "ADD_TASK";
    task: WorkoutTask;
}
interface WorkoutReducerActionAddTaskMultiple {
    type: "ADD_TASK_MULTIPLE";
    tasks: WorkoutTask[];
}
interface WorkoutReducerActionUpdateTask {
    type: "UPDATE_TASK";
    uuid: string;
    task: WorkoutTask;
}
interface WorkoutReducerActionRemoveTask {
    type: "REMOVE_TASK";
    uuid: string;
}
interface WorkoutReducerActionClearTasks {
    type: "CLEAR_TASKS";
}

interface WorkoutReducerActionSetTaskOrder {
    type: "SET_TASK_ORDER";
    order: string[];
}

type WorkoutReducerAction = 
    WorkoutReducerActionAddTask         |
    WorkoutReducerActionAddTaskMultiple |
    WorkoutReducerActionUpdateTask      |
    WorkoutReducerActionRemoveTask      |
    WorkoutReducerActionClearTasks      |
    WorkoutReducerActionSetTaskOrder    ;

function WorkoutReducer(state: WorkoutContextProps, action: WorkoutReducerAction): WorkoutContextProps {
    switch (action.type) {
        //TODO check for duplicates
        case "ADD_TASK":
            return {
                ...state, 
                tasks: [...state.tasks, action.task],
                taskOrder: [...state.taskOrder, action.task.uuid],
            };
        case "ADD_TASK_MULTIPLE":
            return {
                ...state,
                tasks: [...state.tasks, ...action.tasks],
                taskOrder: [...state.taskOrder, ...action.tasks.map(task => task.uuid)],
            };
        case "UPDATE_TASK":
            const i = state.tasks.findIndex(task => task.uuid == action.uuid);
            if(i != -1) {
                state.tasks[i] = action.task;
            }
            return state;
        case "REMOVE_TASK":
            return {
                ...state, 
                tasks: state.tasks.filter(task => task.uuid !== action.uuid),
                taskOrder: state.taskOrder.filter(uuid => uuid !== action.uuid)
            };
        case "CLEAR_TASKS":
            return {
                ...state,
                tasks: [],
                taskOrder: [],
            }
        case "SET_TASK_ORDER":
            const validIds = action.order.filter(uuid => state.tasks.find(task => task.uuid == uuid) !== undefined);
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
    function addTaskMultiple(tasks: WorkoutTask[]) {
        dispatch({type: "ADD_TASK_MULTIPLE", tasks: tasks});
    }
    function updateTask(uuid: string, task: WorkoutTask) {
        dispatch({type: "UPDATE_TASK", uuid: uuid, task: task});
    }
    function removeTask(uuid: string) {
        dispatch({type: "REMOVE_TASK", uuid: uuid});
    }
    function clearTasks() {
        dispatch({type: "CLEAR_TASKS"});
    }
    function findTask(uuid: string): WorkoutTask | undefined {
        return state.tasks.find(task => task.uuid == uuid);
    }

    function setTaskOrder(order: string[]) {
        dispatch({type: "SET_TASK_ORDER", order: order});
    }



    const value: WorkoutContextProps = {
        ...state,
        addTask: addTask,
        addTaskMultiple: addTaskMultiple,
        updateTask: updateTask,
        removeTask: removeTask,
        clearTasks: clearTasks,
        findTask: findTask,
        setTaskOrder: setTaskOrder,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}