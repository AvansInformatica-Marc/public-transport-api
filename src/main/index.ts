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

(async () => {
    const db = new MongoDB("public-transport")
    const dbConnection = await db.connect()
    console.log(`Connected to MongoDB on ${dbConnection.connectionString}`)
    
    const server = new Server()
    server.addController(new OperatorController(new MongoOperatorRepo()))
    server.addController(new StopController(new MongoStopRepo()))
    server.addController(new TrainController(new MongoTrainRepo()))
    server.addController(new TimetableController(new MongoTimetableRepo()))
    const serverConnection = await server.start(parseInt(process.env.PORT || "8080"))
    console.log(`Server is connected and live on http://localhost:${serverConnection.port}/`)
})()