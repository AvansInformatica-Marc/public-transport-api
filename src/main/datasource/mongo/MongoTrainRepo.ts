import MongoRepository from "./MongoRepository";
import Train from "../../models/Train";
import MongoDB from "./MongoDB";

const types = MongoDB.Types

export default class MongoTrainRepo extends MongoRepository<Train>{
    constructor(){
        super("train", {
            name: {
                type: types.String,
                unique: true,
                required: true
            }, manufacturer: {
                type: types.String,
                unique: false,
                required: true
            }, length: {
                type: types.Number,
                unique: false,
                required: true
            }, image: {
                type: types.String,
                unique: false,
                required: false
            }
        })
    }
}