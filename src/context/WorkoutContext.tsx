import { createContext, useState } from "react";
import { Storage, StorageError } from "../storage/AsyncStorageSQL";
import { WorkoutStorage, WorkoutStorageConfig } from "../storage/WorkoutStorage";

import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutContextProps {
    readonly storage: WorkoutStorage;

    // Don't reassign directly! Use helper functions instead.
    currentTasksCache: WorkoutTask[];

    addTask: (task: WorkoutTask) => Promise<void>;
    updateTask: (id: string, task: WorkoutTask) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
    clearTasks: () => Promise<void>;
    findTask: (id: string) => WorkoutTask | undefined;
    reorderTasks: (tasks: WorkoutTask[]) => void;

    loadTasksFromStorage: () => Promise<void>; // will take WorkoutSet Id after that is implemented
}

const NotImplementedError = new Error("Not implemented");

const initialState: WorkoutContextProps = {
    storage: new Storage<WorkoutStorageConfig>(),

    currentTasksCache: [],

    addTask: () => { throw NotImplementedError},
    updateTask: () => { throw NotImplementedError },
    removeTask: () => { throw NotImplementedError },
    clearTasks: () => { throw NotImplementedError },
    findTask: () => { throw NotImplementedError },
    reorderTasks: () => { throw NotImplementedError },

    loadTasksFromStorage: () => new Promise<void>(() => { throw NotImplementedError }),
};

export const WorkoutContext = createContext<WorkoutContextProps>(initialState);


export function WorkoutContextProvider(props: {children: any}) {
    const [state, setState] = useState(initialState);

    async function addTask(task: WorkoutTask) {
        const result = await state.storage.create("WorkoutTask", task);
        if(typeof result == "number") {
            console.log(`Failed to create task ${task.id} in storage: ${StorageError[result]}`);
        } else {
            setState({
                ...state, 
                currentTasksCache: [...state.currentTasksCache, task],
            });
        }
    }

    async function updateTask(id: string, task: WorkoutTask) {
        const result = await state.storage.update("WorkoutTask", id, task)
        if(typeof result === "number") {
            console.log(`Failed to update task ${task.id} in storage: ${StorageError[result]}`);
        } else {
            const i = state.currentTasksCache.findIndex(t => t.id === id);
            if(i >= 0) {
                setState({
                    ...state,
                    currentTasksCache: [...state.currentTasksCache.slice(0, i), task, ...state.currentTasksCache.slice(i + 1)],
                });
            }
        }
    }

    async function removeTask(id: string) {
        const result = await state.storage.delete("WorkoutTask", id)
        if(typeof result === "number") {
            console.log(`Failed to delete task ${id} in storage: ${StorageError[result]}`);
        } else {
            setState({
                ...state,
                currentTasksCache: state.currentTasksCache.filter(task => task.id !== id),
            });
        }
    }

    async function clearTasks() { 
        const result = await state.storage.deleteAll("WorkoutTask")
        if(typeof result === "number") {
            console.log(`Failed to delete all tasks in storage: ${StorageError[result]}`);
        } else {
            setState({
                ...state,
                currentTasksCache: [],
            });
        }
    }

    function findTask(uuid: string): WorkoutTask | undefined {
        return state.currentTasksCache.find(task => task.id == uuid);
    }

    function reorderTasks(tasks: WorkoutTask[]) {
        tasks = tasks.filter(task => state.currentTasksCache.find(t => t.id == task.id) !== undefined);
        setState({
            ...state,
            currentTasksCache: tasks,
        });
    }

    async function loadFromStorage() : Promise<void> {
        const result = await state.storage.getAll("WorkoutTask");
        if(typeof result === "number") {
            throw StorageError[result];
        } else {           
            setState({
                ...state,
                currentTasksCache: [...result],
            });
        }
    }


    const value: WorkoutContextProps = {
        ...state,
        addTask: addTask,
        updateTask: updateTask,
        removeTask: removeTask,
        clearTasks: clearTasks,
        findTask: findTask,
        reorderTasks: reorderTasks,
        
        loadTasksFromStorage: loadFromStorage,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}