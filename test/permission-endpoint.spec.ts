'use strict';

import * as chai from 'chai';
import {after, before, describe} from 'mocha';
import * as request from 'request';
import { ApiServer } from '../src/api-server';
import { Container, Scope } from 'typescript-ioc';

const expect = chai.expect;

Container.bind(ApiServer).scope(Scope.Singleton);
const apiServer: ApiServer = Container.get(ApiServer);
const callRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${apiServer.PORT}`});

describe('CRUD End Point Permission Test', () => {

    before(async () => {
        return await apiServer.start();
    });

    after(async () => {
        return await apiServer.stop();
    });

    describe('/permission', () => {
        it('should return 401 for POST request', (done) => {
            callRequest.post({
                body: JSON.stringify([{'name': 'testCreate'}]),
                url: '/permission',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(401);
                done();
            });
        });
        it('should return 401 for DELETE request', (done) => {
            callRequest.delete({
                body: JSON.stringify(['1']),
                url: '/permission',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.equal(null);
                expect(response.statusCode).to.eq(401);
                done();
            });
        });
        it('should return 401 for GET request', (done) => {
            callRequest('/permission/1', (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(401);
                done();
            });
        });
        it('should return 401 for PUT request', (done) => {
            callRequest.put({
                body: JSON.stringify({'name': 'testUpdate'}),
                url: `/permission/${1}`,
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(401);
                done();
            });
        });
        it('should return 401 for GET List request', (done) => {
            callRequest('/permission/10/1/ASC', (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(401);
                done();
            });
        });
    });

});
