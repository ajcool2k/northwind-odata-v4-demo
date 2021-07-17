import { Connection } from '@odata/server';
import fs from 'fs';
import path from 'path';

const INITAL_DB_NAME = 'initial.sqlite';
const RUNTIME_DB_NAME = 'current.sqlite';
const DATA_LOCATION = 'data';

async function getPath(appDir: string): Promise<string> {
    const src = path.join(appDir, DATA_LOCATION, INITAL_DB_NAME);
    const target = path.join(appDir, DATA_LOCATION, RUNTIME_DB_NAME);

    if (!fs.existsSync(target)) await fs.promises.copyFile(src, target);

    return target;
}

async function importData(connection: Connection, path: string): Promise<void> {
    const sqljsManager = connection.sqljsManager;

    try {
        await sqljsManager.loadDatabase(path);
    } catch (error) {
        console.error(error);
    }
}

async function showData(connection: Connection): Promise<void>  {
    const sqljsManager = connection.sqljsManager;

    try {
        const results = await sqljsManager.query("SELECT name FROM sqlite_master WHERE type='table';");
        const tables = results.map(item => item.name);
        console.debug('Found Tables:', tables);
    } catch (error) {
        console.error(error);
    }
}

async function exportData(connection: Connection, path: string): Promise<void> {
    const sqljsManager = connection.sqljsManager;
    sqljsManager.saveDatabase(path);
    console.info('saved into', path);
}

export {
    getPath,
    showData as showTables,
    importData,
    exportData,
};
