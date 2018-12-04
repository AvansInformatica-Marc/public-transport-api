import { Server } from "@peregrine/webserver"
import MongoDB from "./datasource/MongoDB"
import OperatorController from "./controllers/OperatorController"

(async () => {
    const db = new MongoDB("OV")
    const dbConnection = await db.connect()
    console.log(`Connected to MongoDB on ${dbConnection.connectionString}`)
    
    const server = new Server()
    server.addController(new OperatorController())
    const serverConnection = await server.start(parseInt(process.env.PORT || "8080"))
    console.log(`Server is connected and live on http://localhost:${serverConnection.port}/`)
})()