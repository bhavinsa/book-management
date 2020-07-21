# About this project

```It has an initial setup for creating APIs and support for testing using Mocha and Chai.```

```It already uses some development configurations like TSLint, clustered server instances, middleware and connection to some databases like MongoDB, Postgres, and MySQL by TypeORM.```

# NoSQL Database
For object id in NoSQL use ```@ObjectIdColumn()``` in class BaseModel (```base.model.ts```)
## Sample docker MongoDB
```
$ docker pull mongo:latest
$ docker run -d -p 27017:27017 --name mongo-host -e MONGO_DATABASE=db -e MONGO_ROOT_PASSWORD=123456 -d mongo:latest
$ docker exec -it mongo-host bash
$ mongo
> show dbs
> use db
```

# SQL Database
For object id in SQL DataBase use ```@PrimaryGeneratedColumn()``` in class BaseModel (```base.model.ts```)
## Sample docker MySQL
```
$ docker pull mysql:5.6
$ docker run -d -p 3306:3306 --name mysql-host -e MYSQL_DATABASE=db -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6
$ docker exec -it mysql-host bash
$ mysql -u root -p
```
## Sample docker Postgres
```
$ docker pull postgres:10
$ docker run -d -p 5432:5432 --name postgres-host -e POSTGRES_DATABASE=db -e POSTGRES_ROOT_PASSWORD=123456 -d postgres:10
$ docker exec -it postgres-host bash
$ psql -d postgres -U postgres 
```

# Initial setup
```
npm install
```
## Swagger Docs Generation
```
npm run swagger
```
# Project run
```
npm install -g ts-node-dev
npm run start
```
## Start project in cluster
```
npm start:cluster
```
## Test
```
npm run test
```
### Test with coverage reports:
```
npm run test:coverage
```
The coverage report will be saved under ```./reports/coverage``` folder.

