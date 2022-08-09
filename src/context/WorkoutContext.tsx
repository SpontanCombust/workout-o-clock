import { createContext, useState } from "react";
import { Storage, StorageError } from "../storage/AsyncStorageSQL";
import { WorkoutStorage, WorkoutStorageConfig } from "../storage/WorkoutStorage";

import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutContextProps {
    // Don't reassign directly! Use add/removeTask
    tasks: WorkoutTask[];
    // Don't reassign directly! Use setTaskOrder
    taskOrder: string[]; // array od UUIDs

    addTask: (task: WorkoutTask) => void;
    updateTask: (id: string, task: WorkoutTask) => void;
    removeTask: (id: string) => void;
    clearTasks: () => void;
    findTask: (id: string) => WorkoutTask | undefined;
    setTaskOrder: (order: string[]) => void;


    storage: WorkoutStorage;
    loadFromStorage: () => Promise<void>;
}

const initialState: WorkoutContextProps = {
    tasks: [],
    taskOrder: [],

    addTask: () => {},
    updateTask: () => {},
    removeTask: () => {},
    clearTasks: () => {},
    findTask: () => undefined,
    setTaskOrder: () => {},

    storage: new Storage<WorkoutStorageConfig>(),
    loadFromStorage: () => new Promise<void>(() => {}),
};

export const WorkoutContext = createContext<WorkoutContextProps>(initialState);


export function WorkoutContextProvider(props: {children: any}) {
    const [state, setState] = useState(initialState);

    function addTask(task: WorkoutTask) {
        if(state.tasks.find(t => t.id === task.id) === undefined) {
            setState({
                ...state, 
                tasks: [...state.tasks, task],
                taskOrder: [...state.taskOrder, task.id],
            });

            state.storage.create("WorkoutTask", task)
            .then((value) => {
                if(typeof value === "number") {
                    console.log(`Failed to create task ${task.id} in storage: ${StorageError[value]}`);
                }
            })
            .catch(console.error);
        }
    }
    function updateTask(id: string, task: WorkoutTask) {
        const i = state.tasks.findIndex(task => task.id == id);
        if(i != -1) {
            setState({
                ...state,
                tasks: [...state.tasks.slice(0, i), task, ...state.tasks.slice(i + 1)],
            });

            state.storage.update("WorkoutTask", id, task)
            .then((value) => {
                if(typeof value === "number") {
                    console.log(`Failed to update task ${task.id} in storage: ${StorageError[value]}`);
                }
            }).catch(console.error);
        }
    }
    function removeTask(id: string) {
        setState({
            ...state,
            tasks: state.tasks.filter(task => task.id !== id),
            taskOrder: state.taskOrder.filter(id_ => id_ !== id),
        });

        state.storage.delete("WorkoutTask", id)
        .then((value) => {
            if(typeof value === "number") {
                console.log(`Failed to delete task ${id} in storage: ${StorageError[value]}`);
            }
        }).catch(console.error);
    }
    function clearTasks() {
        setState({
            ...state,
            tasks: [],
            taskOrder: [],
        });

        state.storage.deleteAll("WorkoutTask")
        .then((value) => {
            if(typeof value === "number") {
                console.log(`Failed to delete all tasks in storage: ${StorageError[value]}`);
            }
        }).catch(console.error);
    }
    function findTask(uuid: string): WorkoutTask | undefined {
        return state.tasks.find(task => task.id == uuid);
    }

    function setTaskOrder(order: string[]) {
        const validIds = order.filter(uuid => state.tasks.find(task => task.id == uuid) !== undefined);
        setState({
            ...state,
            taskOrder: validIds,
        });
    }

    async function loadFromStorage() : Promise<void> {
        const tasks = await state.storage.getAll("WorkoutTask");
        if(typeof tasks === "number") {
            throw StorageError[tasks];
        } else {           
            setState({
                ...state,
                tasks: [...tasks],
                taskOrder: [...tasks.map(task => task.id)],
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
        setTaskOrder: setTaskOrder,
        loadFromStorage: loadFromStorage,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}