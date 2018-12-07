import MongoRepository from "./MongoRepository";
import Stop from "../../models/Stop";
import MongoDB from "./MongoDB";

const types = MongoDB.Types

export default class MongoOperatorRepo extends MongoRepository<Stop>{
    constructor(){
        super("stop", {
            name: {
                type: types.String,
                unique: true,
                required: true
            }
        })
    }
}