import {createConnection, Connection, ConnectionOptions} from 'typeorm';

const path = require('path');

/**
 * @author bhavin
 */
export class PostgresConnector {
    private static postgresConnection: Connection;

    get connection(): Connection {
        return PostgresConnector.postgresConnection;
    }

    /**
     * Initiate connection to PostgreSQL
     * @returns {Promise<any>}
     */
	// TODO: Set up .env
    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
			const options: ConnectionOptions= {
				type: 'postgres',
				host: 'localhost',
				port: 5432,
				username: 'postgres',
				password: '123456',
				database: 'postgres',
				synchronize: true,				
				entities: [
                    path.join(__dirname, '../models/*.model.ts')
				]
			};

			createConnection(options).then((connection) => {
				// here you can start to work with your entities
				PostgresConnector.postgresConnection = connection;
				// tslint:disable-next-line:no-console
				console.log('Postgres connected...');
                resolve();
			}).catch(reject);
        });
    }

    /**
     * Disconnects from PostgreSQL
     * @returns {Promise<any>}
     */
    public disconnect(): Promise<any> {
        return PostgresConnector.postgresConnection.close();
    }
}
