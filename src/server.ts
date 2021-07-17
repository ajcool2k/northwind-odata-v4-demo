import { Connection, createTypedODataServer } from '@odata/server';
import cors, { CorsOptions } from 'cors';
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';
import corsConfig from "../conf/cors.config.js";
import { AllEntries } from "./northwind";

const appDir = path.resolve(__dirname, "../");
const dataFile = path.join(appDir, 'data', 'current.sqlite');

const run = async () => {

    const host = 'http://localhost';
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
    const corsOptions: CorsOptions = corsConfig;
    app.use(cors(corsOptions));

    app.set('trust proxy', true);

    app.use(server.create());

    app.listen(port, () => {
        console.log(`server started at:`, '\t', `${host}:${port}`);
        console.log(`metadata available at:`, '\t', `${host}:${port}/$metadata`);

        console.debug(`\nusing cors settings:`, corsOptions);
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