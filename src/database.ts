import { Connection } from "@odata/server";
import path from "path";

export async function createDataFile(appDir: string): Promise<string> {
    const src = path.join(appDir, 'data', 'initial.sqlite');
    const target = path.join(appDir, 'data', 'current.sqlite');
    // Todo: Generate new database without constraints
    // if (!fs.existsSync(target)) await fs.promises.copyFile(src, target);

    return target;
}

export async function importData(connection: Connection, path: string): Promise<void> {
    const sqljsManager = connection.sqljsManager;

    try {
        // Todo: Generate new database without constraints
        // await sqljsManager.loadDatabase(path); // import has load database with constraints 
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
