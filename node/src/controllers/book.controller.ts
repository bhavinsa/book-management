'use strict';

import { Inject } from 'typescript-ioc';
import { Path, POST } from 'typescript-rest';
import * as Joi from 'joi';
import { BaseController } from '../framework/base.controller';
import { BookService } from '../services/book.service';
import { BookModel } from '../models/book.model';

@Path('/book')
export class BookController extends BaseController<BookModel> {

    /**
     * All controllers of BaseController are inherited
     * To build the specific controller of this layer just create them here
     */

    constructor(@Inject protected bookService: BookService) {
        super(bookService);
    }

    public getValidationSchema(): Joi.Schema {
        return Joi.object().keys({
            name: Joi.string().required(),
            author: Joi.string().required(),
            uniqueId: Joi.string().required(),
            publishDate: Joi.string().required(),
            bookCover: Joi.string().required()
        });
    }

    public getEndpointPermission(): any {
        return {
            'list': true,
            'get': true,
            'create': true,
            'delete': true,
            'update': true
        };
    }

    @POST
    @Path('/all')
    public getData(): Promise<any> {
        return new Promise<string>((resolve, reject) => {
            this.bookService.getData().then(resolve)
                .catch(reject);
        });
    }

}
