<h3 align="center">
  Express Application for car rent project
</h3>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;
</p>

## About the project

This api provides a car rent.

This project contains: sending emails, auth JWT
file uploads, injection of dependencies.

## 🚀 Technologies

Technologies that I used to develop this api

  - [Node.js](https://nodejs.org/en/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/pt-br/)
  - [tsyringe](https://github.com/microsoft/tsyringe)
  - [TypeORM](https://typeorm.io/#/)
  - [JWT-token](https://jwt.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Jest](https://jestjs.io/)
  - [SuperTest](https://github.com/visionmedia/supertest)
  - [Eslint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [EditorConfig](https://editorconfig.org/)

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Instances of [PostgreSQL](https://www.postgresql.org/) or any other SQL database

## 💻 Getting started

**Clone the project and access the folder**

```bash
$ git clone https://github.com/clebim/RentaLx.git && cd RentaLx
```
```bash
# Install the dependencies
$ yarn

# Create your database

# Make a copy of './env/.env.example' to './env/.env.dev'
# Do not change the NODE_ENV variable in .env.test
# The aws variables do not need to be filled for dev environment
$ cp ./env/.env.example ./env/.env.dev

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# run command `test` to verify that everything is working correctly
$ yarn test

# To finish, run the api service
$ yarn dev


# Well done, project is started!
```
## :syringe: Tests
In this application, **Unit Tests and Integration Tests** are contemplated using the **Jest** test framework, in order to guarantee the correct functioning of the functionalities and maintain the application in accordance with the requirements. <br/>

- **Developed by** [**Matheus Cleber**](https://br.linkedin.com/in/matheus-cleber) 🤖
