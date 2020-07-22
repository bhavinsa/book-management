'use strict';

import { Path } from 'typescript-rest';
import * as Joi from 'joi';
import { BaseController } from '../framework/base.controller';
import { BookModel } from '../models/book.model';

/**
 * @author bhavin
 * This class was created to increase test coverage
 */
@Path('/permission')
export class PermissionController extends BaseController<BookModel> {

    public getValidationSchema(): Joi.Schema {
        return null;
    }

    public getEndpointPermission(): any {
        return {
            'list': false,
            'get': false,
            'create': false,
            'delete': false,
            'update': false
        };
    }

}
