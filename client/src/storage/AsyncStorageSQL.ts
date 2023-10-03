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
    ): Promise<StorageObject> {
        const key = `${packageName}_${String(tableName)}_${obj.id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                throw StorageError.RECORD_ALREADY_EXISTS;
            }

            await AsyncStorage.setItem(key, JSON.stringify(obj));
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }

        return obj;
    }

    async getAll<TableName extends keyof StorageConfig>(
        tableName: TableName)
    : Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)[]> {
        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(keyPrefix));
            const objs = (await AsyncStorage.multiGet(keys))
                            .map(v => v[1])
                            .filter((v): v is string => v !== null)
                            .map(v => JSON.parse(v));

            return objs;
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async get<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        id: string)
    : Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                throw StorageError.RECORD_NOT_FOUND;
            }

            return JSON.parse(value);
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async getMultiple<TableName extends keyof StorageConfig>(
        tableName: TableName,
        ids: string[]
    ): Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)[]> {
        if(ids.length == 0) {
            return [];
        }

        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = ids.map(id => `${keyPrefix}${id}`);
            const objs = (await AsyncStorage.multiGet(keys))
                            .map(v => v[1])
                            .filter((v): v is string => v !== null)
                            .map(v => JSON.parse(v));

            return objs;
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async update<TableName extends keyof StorageConfig>(
        tableName: TableName,
        id: string,
        obj: StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never
    ): Promise<void> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        if(obj.id !== id) {
            throw StorageError.INVALID_INPUT;
        }

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                throw StorageError.RECORD_NOT_FOUND;
            }

            await AsyncStorage.setItem(key, JSON.stringify(obj));
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async delete<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        id: string)
    : Promise<void> {
        const key = `${packageName}_${String(tableName)}_${id}`;

        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                throw StorageError.RECORD_NOT_FOUND;
            }

            await AsyncStorage.removeItem(key);
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async deleteMultiple<TableName extends keyof StorageConfig>(
        tableName: TableName,
        ids: string[]
    ): Promise<void> {
        if(ids.length == 0) {
            return;
        }

        const keys = ids.map(id => `${packageName}_${String(tableName)}_${id}`);
        console.log(keys);

        try {
            await AsyncStorage.multiRemove(keys);
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async deleteAll<TableName extends keyof StorageConfig>(
        tableName: TableName)
    : Promise<void> {
        const keyPrefix = `${packageName}_${String(tableName)}_`;

        try {
            const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(keyPrefix));
            await AsyncStorage.multiRemove(keys);
        } catch(e) {
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }

    async find<TableName extends keyof StorageConfig>(
        tableName: TableName, 
        query: (predicate: StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never) => boolean
    ): Promise<(StorageConfig[TableName] extends StorageObject ? StorageConfig[TableName] : never)[]> {
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
            throw StorageError.UNDERLYING_STORAGE_ERROR;
        }
    }
}
