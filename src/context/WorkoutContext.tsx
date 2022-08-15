import { createContext, useContext, useState } from "react";

import { Storage, StorageError } from "../storage/AsyncStorageSQL";
import { WorkoutStorage, WorkoutStorageConfig } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";
import { WorkoutTask } from "../types/WorkoutTask";


export interface WorkoutContextProps {
    readonly storage: WorkoutStorage;

    // Don't reassign directly! Use helper functions instead.
    currentSet: WorkoutSet | null;
    // Don't reassign directly! Use helper functions instead.
    currentTasksCache: WorkoutTask[];
    
    addSet(set: WorkoutSet): Promise<void>;
    // Removes set and all tasks associated with it.
    removeSet(set: WorkoutSet): Promise<void>;
    makeSetCurrent(set: WorkoutSet): void;
    // Make set and all tasks associated with it current.
    loadSetTasks(set: WorkoutSet): Promise<void>; // will take WorkoutSet Id after that is implemented

    // Adds the task to current set and to the cache.
    addTask(task: WorkoutTask): Promise<void>;
    updateTask(id: string, task: WorkoutTask): Promise<void>;
    // Removes the task from current set and from the cache.
    removeTask(id: string): Promise<void>;
    // Removes all tasks from current set or set of specified Id and from the cache.
    clearTasks(setId?: string): Promise<void>;
    // Find task in cache
    findTask(id: string): WorkoutTask | undefined;
    reorderTasks(tasks: WorkoutTask[]): Promise<void>;
}

const NotImplementedError = new Error("Not implemented");

const initialState: WorkoutContextProps = {
    storage: new Storage<WorkoutStorageConfig>(),

    currentSet: null,
    currentTasksCache: [],

    addSet: () => { throw NotImplementedError },
    removeSet: () => { throw NotImplementedError },
    loadSetTasks: () => { throw NotImplementedError },
    makeSetCurrent: () => { throw NotImplementedError },

    addTask: () => { throw NotImplementedError},
    updateTask: () => { throw NotImplementedError },
    removeTask: () => { throw NotImplementedError },
    clearTasks: () => { throw NotImplementedError },
    findTask: () => { throw NotImplementedError },
    reorderTasks: () => { throw NotImplementedError },
};

export const WorkoutContext = createContext<WorkoutContextProps>(initialState);

export function useWorkoutContext() {
    return useContext(WorkoutContext);
}

export function WorkoutContextProvider(props: {children: any}) {
    const [state, setState] = useState(initialState);


    async function addSet(set: WorkoutSet) : Promise<void> {
        try {
            await state.storage.create("WorkoutSet", set);
        } catch (error: any) {
            console.error(`Failed to create set ${set.id} in storage: ${StorageError[error]}`);
        }
    }

    async function removeSet(set: WorkoutSet) : Promise<void> {
        try {
            await state.storage.delete("WorkoutSet", set.id);
            await clearTasks(set.id);

            setState({
                ...state,
                currentSet: null,
                currentTasksCache: [],
            });
        } catch (error: any) {
            console.error(`Failed to delete set ${set.id} in storage: ${StorageError[error]}`);
        }
    }

    function makeSetCurrent(set: WorkoutSet) {
        setState({
            ...state,
            currentSet: set,
            currentTasksCache: [],
        });
    }

    async function loadSetTasks(set: WorkoutSet) : Promise<void> {
        try {
            const tasks = await state.storage.find("WorkoutTask", (task: WorkoutTask) => set.taskIds.includes(task.id));

            setState({
                ...state,
                currentTasksCache: [...tasks],
            });
        } catch (error: any) {
            console.error(`Failed to load tasks for set ${set.id} in storage: ${StorageError[error]}`);
        }
    }


    async function addTask(task: WorkoutTask) {
        if(state.currentSet !== null) {
            try {
                await state.storage.create("WorkoutTask", task);
                
                const updatedSet = {
                    ...state.currentSet,
                    taskIds: [...state.currentSet.taskIds, task.id],
                };
                

                await state.storage.update("WorkoutSet", state.currentSet.id, updatedSet)
                
                setState({
                    ...state,
                    currentSet: updatedSet,
                    currentTasksCache: [...state.currentTasksCache, task],
                });

            } catch (error: any) {
                console.error(`Failed to add task ${task.id} in storage: ${StorageError[error]}`);
            }
        }
    }

    async function updateTask(id: string, task: WorkoutTask) {
        if(state.currentSet !== null) {
            try {
                await state.storage.update("WorkoutTask", id, task)
                
                const i = state.currentTasksCache.findIndex(t => t.id === id);
                if(i >= 0) {
                    setState({
                        ...state,
                        currentTasksCache: [...state.currentTasksCache.slice(0, i), task, ...state.currentTasksCache.slice(i + 1)],
                    });
                }
            } catch (error: any) {
                console.error(`Failed to update task ${task.id} in storage: ${StorageError[error]}`);
            }
        }
    }

    async function removeTask(id: string) {
        if(state.currentSet !== null) {
            try {
                await state.storage.delete("WorkoutTask", id)
                
                const updatedSet = {
                    ...state.currentSet,
                    taskIds: state.currentSet.taskIds.filter(i => i !== id),
                };
                
                await state.storage.update("WorkoutSet", state.currentSet.id, updatedSet)
                
                setState({
                    ...state,
                    currentSet: updatedSet,
                    currentTasksCache: state.currentTasksCache.filter(task => task.id !== id),
                });

            } catch (error: any) {
                console.error(`Failed to delete task ${id} in storage: ${StorageError[error]}`);
            }
        }
    }

    async function clearTasks(setId?: string) {
        try {
            if(setId !== undefined) {
                const set = await state.storage.get("WorkoutSet", setId);

                set.taskIds.forEach(async (id) => {
                    const result = await state.storage.delete("WorkoutTask", id);
                    if(typeof result === "number") {
                        console.log(`Failed to delete task ${id} in storage: ${StorageError[result]}`);
                    }
                });

                await state.storage.update("WorkoutSet", setId, {
                    ...set,
                    taskIds: [],
                });

            } else if(state.currentSet !== null) {
                state.currentSet.taskIds.forEach(async (id) => {
                    await state.storage.delete("WorkoutTask", id)
                });
    
                const updatedSet = {
                    ...state.currentSet,
                    taskIds: [],
                };
                
                await state.storage.update("WorkoutSet", state.currentSet.id, updatedSet);
    
                setState({
                    ...state,
                    currentSet: updatedSet,
                    currentTasksCache: [],
                });
            }
            
        } catch (error: any) {
            console.error(`Failed to clear tasks in storage: ${StorageError[error]}`);
        }
    }

    function findTask(uuid: string): WorkoutTask | undefined {
        return state.currentTasksCache.find(task => task.id == uuid);
    }

    async function reorderTasks(tasks: WorkoutTask[]) {
        if(state.currentSet !== null) {
            try {
                tasks = tasks.filter(task => state.currentTasksCache.find(t => t.id == task.id) !== undefined);
    
                const updatedSet = {
                    ...state.currentSet,
                    taskIds: tasks.map(task => task.id),
                };
    
                await state.storage.update("WorkoutSet", state.currentSet.id, updatedSet);
    
                setState({
                    ...state,
                    currentSet: updatedSet,
                    currentTasksCache: tasks,
                });
            } catch (error: any) {
                console.error(`Failed to reorder tasks in storage: ${StorageError[error]}`);
            }
        }
    }


    const value: WorkoutContextProps = {
        ...state,

        addSet: addSet,
        removeSet: removeSet,
        makeSetCurrent: makeSetCurrent,
        loadSetTasks: loadSetTasks,

        addTask: addTask,
        updateTask: updateTask,
        removeTask: removeTask,
        clearTasks: clearTasks,
        findTask: findTask,
        reorderTasks: reorderTasks,
    };

    return <WorkoutContext.Provider value={value}>{props.children}</WorkoutContext.Provider>;
}