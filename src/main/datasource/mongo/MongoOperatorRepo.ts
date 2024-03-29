import MongoRepository from "./MongoRepository";
import Operator from "../../models/Operator";
import MongoDB from "./MongoDB";

const types = MongoDB.Types

export default class MongoOperatorRepo extends MongoRepository<Operator>{
    constructor(){
        super("operator", {
            name: {
                type: types.String,
                unique: true,
                required: true
            }, logo: {
                type: types.String,
                unique: true,
                required: false
            }
        })
    }
}