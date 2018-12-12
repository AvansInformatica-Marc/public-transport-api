# OV API
## Web URL
https://ov-api.herokuapp.com/

## Owner
Marc Bouwman  
Studentnr. 2125922  
Informatica klas 2B

## Setup
The `.env` file should contain the following properties:

property | required | meaning | example
--- | --- | --- | ---
PORT | yes | The port to run the server on | 8080
DB_HOST | yes | The host of the database | localhost
DB_PORT | no | The port of the database | 27017
DB_NAME | yes | The name of the database | public-transport
DB_USER | no | The username of a user on the database | admin
DB_PASSWORD | no | The password that belongs to the user | ******
ADMIN_TOKEN | yes | The token that belongs to the admin, which will grant full rights on every endpoint. | AdminToken1234

## Installing dependencies
`npm install`

## Building
`npm build`

## Start
`npm start`

## Running tests
`npm test`