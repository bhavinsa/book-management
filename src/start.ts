'use strict';

import { ApiServer } from './api-server';
import { Container, Scope } from 'typescript-ioc';
import { MongoConnector } from './database/mongo-connector';
// import { MySqlConnector } from './database/mysql-connector';
// import { PostgresConnector } from './database/postgres-connector';

// TODO: Transform database connectors to Singleton
export async function start(): Promise<void> {
    const mongoConnector = new MongoConnector();
    // const mySqlConnector = new MySqlConnector();
    // const postgresConnector = new PostgresConnector();

    // that will make any injection to Date to return 
    // the same instance, created when the first call is executed.
    Container.bind(ApiServer).scope(Scope.Singleton);
    // it will ask the IoC Container to retrieve the instance.
    const apiServer: ApiServer = Container.get(ApiServer);
    await apiServer.start();

    await mongoConnector.connect();
    // await mySqlConnector.connect();
    // await postgresConnector.connect();

    const graceful = async () => {
        await mongoConnector.disconnect();
        // await mySqlConnector.disconnect();
        // await postgresConnector.disconnect();

        await apiServer.stop();
        process.exit(0);
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
}
