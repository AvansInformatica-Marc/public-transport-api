import MongoRepository from "./MongoRepository";
import Operator from "../../models/Operator";
import MongoDB from "./MongoDB";

const types = MongoDB.Types

export default class MongoOperatorRepo extends MongoRepository<Operator>{
    constructor(){
        super("operators", {
            name: types.String
        })
    }
}