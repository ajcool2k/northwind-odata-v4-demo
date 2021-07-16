import { Connection } from "@odata/server";
import fs from "fs";
import path from "path";

export async function createDataFile(appDir: string): Promise<string> {
    const src = path.join(appDir, 'data', 'initial.sqlite');
    const target = path.join(appDir, 'data', 'gary.sqlite');
    if (!fs.existsSync(target)) await fs.promises.copyFile(src, target);

    return target;
}

export async function importData(connection: Connection, path: string): Promise<void> {
    const sqljsManager = connection.sqljsManager;

    try {
        await sqljsManager.loadDatabase(path);
        const [result] = await sqljsManager.query("SELECT COUNT(*) as Count FROM Products");
        console.log('Products:', result);
    } catch (error) {
        console.error(error);
    }
}

export async function exportData(connection: Connection, path: string): Promise<void> {
    const sqljsManager = connection.sqljsManager;
    sqljsManager.saveDatabase(path);
    console.info('saved into', path);
}
