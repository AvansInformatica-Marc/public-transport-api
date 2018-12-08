import MongoRepository from "./MongoRepository";
import Ride from "../../models/Ride";
import MongoDB from "./MongoDB";

const types = MongoDB.Types

export default class MongoTimetableRepo extends MongoRepository<Ride> {
    constructor(){
        super("timetable", {
            operator: {
                type: types.ObjectId,
                ref: 'operator',
                unique: false,
                required: true
            }, type: {
                type: types.String,
                unique: false,
                required: true
            }, train: [{
                type: types.ObjectId,
                ref: 'train',
                unique: false,
                required: false
            }], bus: {
                type: types.ObjectId,
                ref: 'bus',
                unique: false,
                required: false
            }, line: {
                type: types.Number,
                unique: false,
                required: false
            }, stops: [{
                stop: {
                    type: types.ObjectId,
                    ref: 'stop',
                    unique: false,
                    required: true
                }, platform: {
                    type: types.String,
                    unique: false,
                    required: false
                }, arrivalAfter: {
                    type: types.Number,
                    unique: false,
                    required: false
                }, waitingTime: {
                    type: types.Number,
                    unique: false,
                    required: false
                }
            }], excludeDays: [{
                type: types.Number,
                unique: false,
                required: false
            }], departures: [{
                type: types.String,
                unique: false,
                required: false
            }]
        })
    }
}