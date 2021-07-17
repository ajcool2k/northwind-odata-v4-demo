#!/usr/bin/env node

import { createTypedODataServer } from '@odata/server';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';
import { createDataFile, importData } from './database';
import { AllEntries } from './northwind';

const run = async () => {
    const host = process.env.SERVER_HOST || '0.0.0.0';
    const port = parseInt(process.env.SERVER_PORT || '3666', 10);
    const partialPath = process.env.SERVER_PORT || '/odata';
    const appDir = path.resolve(__dirname, '../');
    const corsOptions = { origin: '*', methods: '*', allowedHeaders: '*' };

    const server = await createTypedODataServer({
        name: 'default',
        type: 'sqljs',
        synchronize: false, // don't create at start-up we use our own SQL database
        autoSave: false,
        logging: true,
        cache: true,
        entities: [...AllEntries],
    });

    server.namespace = 'kendo_northwind_pg.Models'; // we can probably change this in the long run
    const connection = server.getConnection();
    const dataFile = await createDataFile(appDir);
    await importData(connection, dataFile);

    const app = express();
    app.use(cors(corsOptions));
    app.set('trust proxy', true);
    app.use(partialPath, server.create());

    app.listen(port, host, () => {
        console.log(`server started at ${host}:${port}${partialPath}`);
    });
};

if (require.main == module) {
    run().catch(console.error);
}