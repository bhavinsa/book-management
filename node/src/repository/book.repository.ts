'use strict';

import { BookModel } from '../models/book.model';
import { Inject } from 'typescript-ioc';
import { MongoConnector } from '../database/mongo-connector';
import { Repository, EntityRepository } from 'typeorm';

/**
 * @author bhavin
 */
@EntityRepository(BookModel)
export class UserRepository extends Repository<BookModel> {

    @Inject
    protected dbMongo: MongoConnector;

    public getModel(schema: string): any {
        return Object.values(require(`../models/${schema}`))[0];
    }

    public userGet(schema: string): Promise<any> {
        return this.dbMongo.connection.getRepository(this.getModel(schema)).find();
    }

}
