'use strict';

import { BookModel } from '../models/book.model';
import { BaseService } from '../framework/base.service';
import { UserRepository } from '../repository/book.repository';
import { Inject } from 'typescript-ioc';

export class BookService extends BaseService<BookModel> {

    @Inject private userRepository: UserRepository;
    /**
     * All services of BaseService are inherited
     * To build the specific services of this layer just create them here
     */

    public getSchemaName() {
        return 'book.model';
    }

    public getData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRepository.userGet(this.getSchemaName())
                .then(resolve)
                .catch(reject);
        });
    }

}
