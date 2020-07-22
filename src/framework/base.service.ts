'use strict';

import { BaseRepository } from './base.repository';
import { BaseModel } from './base.model';
import { Inject } from 'typescript-ioc';
import { Abstract } from 'typescript-rest';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ORDER } from './base.controller';

/**
 * @author bhavin
 */
@Abstract
export abstract class BaseService<T extends BaseModel> {

    @Inject private repository: BaseRepository<T>;
    
    public abstract getSchemaName(): string;
    
    public list(recordsByPage: number, page: number, sort: ORDER, keyword: string): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            this.repository.list(this.getSchemaName(), recordsByPage, page, sort, keyword)
                .then(resolve)
                .catch(reject);
        });
    }

    public get(_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.repository.get(this.getSchemaName(), _id)
                .then(resolve)
                .catch(reject);
        });
    }

    public create(entities: Array<T>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.repository.create(this.getSchemaName(), entities)
                .then(resolve)
                .catch(reject);
        });
    }

    public delete(_id: string): Promise<DeleteResult> {
        return new Promise((resolve, reject) => {            
            this.repository.delete(this.getSchemaName(), _id)
                .then(resolve)
                .catch(reject);
        });
    }

    public update(_id: string, entity: T): Promise<UpdateResult> {
        return new Promise((resolve, reject) => {
            this.repository.update(this.getSchemaName(), _id, entity)
                .then(resolve)
                .catch(reject);
        });
    }

}
