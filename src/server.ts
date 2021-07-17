import { createTypedODataServer } from '@odata/server';
import cors, { CorsOptions } from 'cors';
import express from "express";
import * as path from 'path';
import 'reflect-metadata';
import corsConfig from "../conf/cors.config.js";
import * as database from './database';
import { AllEntries } from "./northwind";

const appDir = path.resolve(__dirname, "../");

const run = async () => {
    const host = process.env.HOST || '0.0.0.0';
    const port = parseInt(process.env.PORT || '50000', 10);
    const protocol = 'http://';

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

    // Make use of existing sqlite database
    const dataFile = await database.getPath(appDir);
    await database.importData(server.getConnection(), dataFile);

    const app = express();
    const corsOptions: CorsOptions = corsConfig;
    app.use(cors(corsOptions));

    app.set('trust proxy', true);

    app.use(server.create());

    app.listen(port, () => {
        console.log(`server started at:`, '\t', `${protocol}${host}:${port}`);
        console.log(`metadata available at:`, '\t', `${protocol}${host}:${port}/$metadata`);

        console.debug(`\nusing cors settings:`, corsOptions);
    });
};

if (require.main == module) {
    run().catch(console.error);
}