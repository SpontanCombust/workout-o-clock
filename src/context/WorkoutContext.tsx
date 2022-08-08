import { createContext, useReducer, useState } from "react";

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

export const WorkoutContext = createContext<WorkoutContextProps>(initialState);


export function WorkoutContextProvider(props: {children: any}) {
    const [state, setState] = useState(initialState);

    function addTask(task: WorkoutTask) {
        if(state.tasks.find(t => t.uuid === task.uuid) === undefined) {
            setState({
                ...state, 
                tasks: [...state.tasks, task],
                taskOrder: [...state.taskOrder, task.uuid],
            });
        }
    }
    function addTaskMultiple(tasks: WorkoutTask[]) {
        const validTasks = tasks.filter(pendingTask => state.tasks.find(t => t.uuid === pendingTask.uuid) === undefined);
        setState({
            ...state,
            tasks: [...state.tasks, ...validTasks],
            taskOrder: [...state.taskOrder, ...validTasks.map(task => task.uuid)],
        });
    }
    function updateTask(uuid: string, task: WorkoutTask) {
        const i = state.tasks.findIndex(task => task.uuid == uuid);
        if(i != -1) {
            setState({
                ...state,
                tasks: [...state.tasks.slice(0, i), task, ...state.tasks.slice(i + 1)],
            });
        }
    }
    function removeTask(uuid: string) {
        setState({
            ...state,
            tasks: state.tasks.filter(task => task.uuid !== uuid),
            taskOrder: state.taskOrder.filter(id => id !== uuid),
        });
    }
    function clearTasks() {
        setState({
            ...state,
            tasks: [],
            taskOrder: [],
        });
    }
    function findTask(uuid: string): WorkoutTask | undefined {
        return state.tasks.find(task => task.uuid == uuid);
    }

    function setTaskOrder(order: string[]) {
        const validIds = order.filter(uuid => state.tasks.find(task => task.uuid == uuid) !== undefined);
        setState({
            ...state,
            taskOrder: validIds,
        });
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