'use strict';

import * as chai from 'chai';
import {after, before, describe} from 'mocha';
import * as request from 'request';
import { ApiServer } from '../src/api-server';
import { Container, Scope } from 'typescript-ioc';
import { HttpMethod, Server } from 'typescript-rest';
import { BookModel } from '../src/models/user.model';
import { MongoConnector } from '../src/database/mongo-connector';

const expect = chai.expect;

Container.bind(ApiServer).scope(Scope.Singleton);
const apiServer: ApiServer = Container.get(ApiServer);
const mongoConnector = new MongoConnector();
const callRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${apiServer.PORT}`});

const sampleOne = new BookModel('testOne');
const sampleTwo = new BookModel('testTwo');
const samples: Array<BookModel> = [sampleOne, sampleTwo];
let receivedSample: BookModel = null;
   
describe('CRUD Controller Tests', () => {

    before(async () => {
        await mongoConnector.connect();
        return await apiServer.start();
    });

    after(async () => {
        await mongoConnector.disconnect();
        return await apiServer.stop();
    });

    describe('The Rest Server', () => {
        it('should provide a catalog containing the exposed paths', () => {
            expect(Server.getPaths()).to.include.members([
                '/health',
                '/sample-controller/:recordsByPage/:page/:sort',
                '/sample-controller/:id',
                '/sample-controller'
            ]);
            expect(Server.getHttpMethods('/health')).to.have.members([HttpMethod.GET]);
            expect(Server.getHttpMethods('/sample-controller')).to.have.members([HttpMethod.POST, HttpMethod.DELETE]);
            expect(Server.getHttpMethods('/sample-controller/:id')).to.have.members([HttpMethod.GET, HttpMethod.PUT]);
            expect(Server.getHttpMethods('/sample-controller/:recordsByPage/:page/:sort')).to.have.members([HttpMethod.GET]);            
        });
    });

    describe('/health', () => {
        it('should return the message with status server for GET requests', (done) => {
            callRequest('/health', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(body).to.eq('Server is up!');
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            callRequest.post({
                body: 'test',
                url: '/health'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });

    describe('/sample-controller', () => {
        it('should return 201 for POST requests', (done) => {
            callRequest.post({
                body: JSON.stringify(samples),
                url: '/sample-controller',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                sampleOne._id = JSON.parse(body).insertedIds[0]._id;
                sampleTwo._id = JSON.parse(body).insertedIds[1]._id;
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(201);
                expect(JSON.parse(body).insertedIds.length).to.eq(2);
                done();
            });
        });

        it('should return 400 for POST requests without attribute \'name\' required', (done) => {
            callRequest.post({
                body: JSON.stringify([{'name': null}]),
                url: '/sample-controller',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(400);
                done();
            });
        });
    });

    describe('/sample-controller', () => {
        it('should return 201 for DELETE request', (done) => {
            callRequest.delete({
                body: JSON.stringify([sampleTwo._id]),
                url: '/sample-controller',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.equal(null);
                expect(response.statusCode).to.eq(201);
                done();
            });
        });

        it('should return 500 for DELETE request with id wrong', (done) => {
            callRequest.delete({
                body: JSON.stringify(['aaaaa']),
                url: '/sample-controller',
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.equal(null);
                expect(response.statusCode).to.eq(500);
                done();
            });
        });
    });

    describe('/sample-controller/:id', () => {
        it('should return the object sample for GET requests and compare', (done) => {
            callRequest(`/sample-controller/${sampleOne._id}`, (error, response, body) => {
                receivedSample = JSON.parse(body);
                delete receivedSample['createdAt'];
                delete receivedSample['updatedAt'];
                delete receivedSample['__v'];
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(200);
                expect(receivedSample).to.deep.equals(sampleOne);
                done();
            });
        });

        it('should return 500 for GET requests with id null', (done) => {
            callRequest('/sample-controller/null', (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(500);
                done();
            });
        });
    });

    describe('/sample-controller/:id', () => {
        it('should return 201 for PUT requests', (done) => {
            callRequest.put({
                body: JSON.stringify({'name': 'testOneUpdated'}),
                url: `/sample-controller/${sampleOne._id}`,
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(201);
                done();
            });
        });

        it('should return 400 for PUT request without attribute \'name\' required', (done) => {
            callRequest.put({
                body: JSON.stringify({'name': null}),
                url: `/sample-controller/${sampleOne._id}`,
                headers: {'content-type': 'application/json'}
            }, (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(400);
                done();
            });
        });
    });

    describe('/sample-controller/:recordsByPage/:page/:sort', () => {
        it('should return 200 for GET request', (done) => {
            callRequest('/sample-controller/10/1/ASC', (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(200);
                expect(JSON.parse(body).length).to.lte(10);
                done();
            });
        });

        it('should return 404 for GET request', (done) => {
            callRequest('/sample-controller/10/ASC', (error, response, body) => {
                expect(error).to.eq(null);
                expect(response.statusCode).to.eq(404);
                done();
            });
        });
    });

});
