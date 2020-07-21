import {createConnection, Connection, ConnectionOptions} from 'typeorm';

const path = require('path');

/**
 * @author bhavin
 */
export class MySqlConnector {
	private static mySqlConnection: Connection;
	
	get connection(): Connection {
        return MySqlConnector.mySqlConnection;
    }

    /**
     * Initiate connection to MySQL
     * @returns {Promise<any>}
     */
		// TODO: Set up .env
    public connect(): Promise<any> {
		// tslint:disable-next-line:no-console
		console.warn(__dirname);
        return new Promise<any>((resolve, reject) => {
			const options: ConnectionOptions = {
				type: 'mysql',
				synchronize: true,
				host: 'localhost',
				port: 3306,
				username: 'root',
				password: '123456',
				database: 'db',
				entities: [
					path.join(__dirname, '../models/*.model.ts')
				]
			};
			createConnection(options).then((connection) => {
				// here you can start to work with your entities
				MySqlConnector.mySqlConnection = connection;
				// tslint:disable-next-line:no-console
				console.log('MySQL connected...');
				resolve();
			}).catch(reject);
        });
	}
	
    /**
     * Disconnects from MySQL
     * @returns {Promise<any>}
     */
    public disconnect(): Promise<any> {
        return MySqlConnector.mySqlConnection.close();
    }
}
