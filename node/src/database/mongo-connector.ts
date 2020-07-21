import {config} from 'dotenv';
import * as mongoose from 'mongoose';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';

const path = require('path');

/**
 * @author val.rudi
 * &
 * @author bhavin
 */
export class MongoConnector {
    private static mongoConnection: Connection;

    constructor() {
        /**
         * Load environment variables from .env file, where API keys and passwords are configured.
         */
        config({path: '.env'});
        (mongoose as any).Promise = global.Promise;
        // (mongoose as any).Promise = require('bluebird');
    }

    get connection(): Connection {
        return MongoConnector.mongoConnection;
    }

    /**
     * Initiate connection to MongoDB
     * @returns {Promise<any>}
     */
    // TODO: Set up .env
    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const options: ConnectionOptions = {
                type: 'mongodb',
                useNewUrlParser: true,
                url: process.env.MONGODB_URI,
                password: '123456',
                host: 'localhost',
                database: 'db',
				entities: [
                    path.join(__dirname, '../models/*.model.ts')
                ]
			};

            createConnection(options).then((connection) => {
				// here you can start to work with your entities
				MongoConnector.mongoConnection = connection;
                const indexOfA = process.env.MONGODB_URI.indexOf('@');
                const db = indexOfA !== -1 ?
                    process.env.MONGODB_URI.substring(0, 10) + '!_:_!' + process.env.MONGODB_URI.substring(indexOfA) :
                    process.env.MONGODB_URI;
                // TODO: winston
                // tslint:disable-next-line:no-console
                console.log('MongoDB connected [%s]', db);
				resolve();
			}).catch(reject);
        });
    }

    /**
     * Disconnects from MongoDB
     * @returns {Promise<any>}
     */
    public disconnect(): Promise<any> {
        return mongoose.connection.close();
    }
}
