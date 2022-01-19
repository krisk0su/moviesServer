//import {config} from 'dotenv';
import * as mongoose from 'mongoose';
import { connect, Connection } from 'mongoose';

/**
 * @author val.rudi
 */
export class MongoConnector {
    private mongoConnection: Connection;

    constructor() {
        /**
         * Load environment variables from .env file, where API keys and passwords are configured.
         */
        //config({path: '.env'});

        (mongoose as any).Promise = global.Promise;
        // (mongoose as any).Promise = require('bluebird');
    }

    /**
     * Initiate connection to MongoDB
     * @returns {Promise<any>}
     */
    public connect(): Promise<any> {
        return new Promise<any>(async (resolve: any, reject: any) => {
            const options: any = {
                keepAlive: true,
                useNewUrlParser: true
                // promiseLibrary: require('bluebird')
            };
            this.mongoConnection = mongoose.connection;
            const connection = await connect('mongodb://localhost:27017/movies',
                options);
        });
    }

    /**
     * Disconnects from MongoDB
     * @returns {Promise<any>}
     */
    public disconnect(): Promise<any> {
        return this.mongoConnection.close();
    }
};