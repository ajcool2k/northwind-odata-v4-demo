import { Connection, createTypedODataServer } from '@odata/server';
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';
import { AllEntries } from "./northwind";

const appDir = path.resolve(__dirname, "../");
const dataFile = path.join(appDir, 'data', 'current.sqlite');

const run = async () => {

    const port = parseInt(process.env.PORT || '50000', 10);

    const server = await createTypedODataServer({
      name: "default",
      type: "sqljs",
      synchronize: false, // don't create at start-up we use our own SQL database
      // autoSave: true,
      logging: true,
      cache: true,
      entities: [...AllEntries],
    });

    server.namespace = "kendo_northwind_pg.Models"; // we can probably change this in the long run

    const connection = server.getConnection();

    if (!fs.existsSync(dataFile)) createDataFile();

    // Import dataFile
    importData(connection, dataFile);

    const app = express();

    app.set('trust proxy', true);

    app.use(server.create());

    app.listen(port, () => {
        console.log(`server started at ${port}`);
    });
};

const createDataFile = () => {
    const src = path.join(appDir, 'data', 'initial.sqlite');
    const target = path.join(appDir, 'data', 'current.sqlite');
    fs.copyFileSync(src, target);
};

const importData = async (connection: Connection, path: string) => {
    const sqljsManager = connection.sqljsManager;

    try {
        await sqljsManager.loadDatabase(path);
        // const resultAfterLoad = await sqljsManager.query("SELECT * FROM Customers");
        // console.log('resultAfterLoad', resultAfterLoad);
    } catch (error) {
        console.error(error);
    }
};

const exportData = async (connection: Connection, path: string) => {
    const sqljsManager = connection.sqljsManager;
    sqljsManager.saveDatabase(path);
    console.info('saved into', path);
};

if (require.main == module) {
    run().catch(console.error);
}