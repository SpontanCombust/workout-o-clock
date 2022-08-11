import AsyncStorage from "@react-native-async-storage/async-storage";

import { name as packageName } from "../../package.json";
import uuid from "../utils/uuid";


export class StorageObject {
    id: string;

    constructor(id?: string) {
        this.id = id !== undefined ? id : uuid();
    }
}

export enum StorageError {
    UNDERLYING_STORAGE_ERROR,
    RECORD_ALREADY_EXISTS,
    RECORD_NOT_FOUND,
    INVALID_INPUT,
}

export class Storage<StorageConfig> {
    async create<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        obj: StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never
    ): Promise<StorageObject | StorageError> {
        const key = `${packageName}_${String(tableName)}_${obj.id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return StorageError.RECORD_ALREADY_EXISTS;
            }

            await AsyncStorage.setItem(key, JSON.stringify(obj));
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }

        return obj;
    }

    async getAll<TableName extends keyof StorageConfig>(
        tableName: TableName)
    : Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)[] | StorageError> {
        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(keyPrefix));
            const objs = (await AsyncStorage.multiGet(keys))
                            .map(v => v[1])
                            .filter((v): v is string => v !== null)
                            .map(v => JSON.parse(v));

            return objs;
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async get<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        id: string)
    : Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never) | StorageError> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                return StorageError.RECORD_NOT_FOUND;
            }

            return JSON.parse(value);
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }
    } 

    async update<TableName extends keyof StorageConfig>(
        tableName: TableName,
        id: string,
        obj: StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never
    ): Promise<null | StorageError> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        if(obj.id !== id) {
            return StorageError.INVALID_INPUT;
        }

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                return StorageError.RECORD_NOT_FOUND;
            }

            await AsyncStorage.setItem(key, JSON.stringify(obj));
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }

        return null;
    }
    //TODO multiple delete (array of ids as param)
    async delete<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        id: string)
    : Promise<null | StorageError> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                return StorageError.RECORD_NOT_FOUND;
            }

            await AsyncStorage.removeItem(key);
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }

        return null;
    }

    async deleteAll<TableName extends keyof StorageConfig>(
        tableName: TableName)
    : Promise<null | StorageError> {
        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(keyPrefix));
            await AsyncStorage.multiRemove(keys);
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }

        return null;
    }

    async find<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        query: (predicate: StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never) => boolean
    ): Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)[] | StorageError> {
        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(keyPrefix));
            const objs = (await AsyncStorage.multiGet(keys))
                            .map(v => v[1])
                            .filter((v): v is string => v !== null)
                            .map(v => JSON.parse(v))
                            .filter(query);

            return objs;
        } catch(e) {
            return StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }
}
