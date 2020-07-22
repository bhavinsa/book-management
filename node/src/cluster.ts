#!/usr/bin/env node
'use strict';

import * as cluster from 'cluster';
import * as os from 'os';
import { start } from './start';
import logger from './logger';

// tslint:disable:no-console
if (cluster.isMaster) {
    const n = os.cpus().length;
    logger.info(`Starting child processes...`);

    for (let i = 0; i < n; i++) {
        const env = { processNumber: i + 1 };
        const worker = cluster.fork(env);
        (worker as any).process['env'] = env;
    }

    cluster.on('online', function (worker) {
        logger.info(`Child process running PID: ${worker.process.pid} PROCESS_NUMBER: ${(worker as any).process['env'].processNumber}`);
    });

    cluster.on('exit', function (worker, code, signal) {
        logger.info(`PID ${worker.process.pid}  code: ${code}  signal: ${signal}`);
        const env = (worker as any).process['env'];
        const newWorker = cluster.fork(env);
        (newWorker as any).process['env'] = env;
    });
} else {
    start()
        .catch((err) => {
            logger.error(`Error starting server: ${err.message}`);
            process.exit(-1);
        });
}

process.on('uncaughtException', function (err: any) {
    logger.info(err);
});
