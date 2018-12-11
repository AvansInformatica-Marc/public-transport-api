import { Server } from "@peregrine/webserver"
import MongoDB from "./datasource/mongo/MongoDB"
import OperatorController from "./controllers/OperatorController"
import MongoOperatorRepo from "./datasource/mongo/MongoOperatorRepo";
import MongoStopRepo from "./datasource/mongo/MongoStopRepo";
import StopController from "./controllers/StopController";
import TrainController from "./controllers/TrainController";
import MongoTrainRepo from "./datasource/mongo/MongoTrainRepo";
import TimetableController from "./controllers/TimetableController";
import MongoTimetableRepo from "./datasource/mongo/MongoTimetableRepo";
import OperatorAuthHandler from "./OperatorAuthHandler";
import dotenv from "dotenv"

if (!process.env.DB_NAME) dotenv.load();

(async () => {
    const db = new MongoDB(process.env.DB_NAME || "public-transport")
    const credentials = process.env.DB_USER && process.env.DB_PASSWORD ? {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    } : undefined
    const dbConnection = await db.connect(process.env.DB_HOST, process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, credentials)
    console.log(`Connected to MongoDB on ${dbConnection.connectionString}`)
    
    const server = new Server()
    server.setCorsHeaders()
    const operatorRepo = new MongoOperatorRepo()
    const authHandler = new OperatorAuthHandler(operatorRepo)
    server.addController(new OperatorController(operatorRepo), authHandler)
    server.addController(new StopController(new MongoStopRepo()), authHandler)
    server.addController(new TrainController(new MongoTrainRepo()), authHandler)
    server.addController(new TimetableController(new MongoTimetableRepo()), authHandler)
    const serverConnection = await server.start(parseInt(process.env.PORT || "8080"))
    console.log(`Server is connected and live on http://localhost:${serverConnection.port}/`)
})()