import "mocha"
import chai from "chai"
import Ride from "../main/models/Ride"
import TimetableController from "../main/controllers/TimetableController"
import RepoMock from "./RepoMock"
import { Entity } from "../main/models/db/Entity";

chai.should()

describe(`TimetableController`, () => {
    it(`Get by id should throw 404 Not Found when entity doesn't exist`, async () => {
        const repo = new RepoMock<Ride>()
        repo.getById = async () => null
        const controller = new TimetableController(repo)

        try {
            await controller.get("abcd", {})
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(404)
        }
    })

    it(`Get by id should return model when valid`, async () => {
        const repo = new RepoMock<Ride>()
        const testModel: Entity<Ride> = { "_id": "1", "operator": "2", "type": "testRide", "stops": [], "excludeDays": [], "departures": []}
        repo.getById = async () => testModel
        const controller = new TimetableController(repo)

        const result = await controller.get("abcd", {})
        result.should.have.property("_id").that.is.a("string").which.equals(testModel._id)
        result.should.have.property("operator").that.is.a("string").which.equals(testModel.operator)
        result.should.have.property("type").that.is.a("string").which.equals(testModel.type)
    })

    it(`Create should throw an Unauthorised error, when authentication is missing`, async () => {
        const controller = new TimetableController(new RepoMock<Ride>())

        try {
            await controller.create({}, {}, undefined)
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(401)
        }
    })

    it(`Create should throw an Badrequest error, when the input model is invalid`, async () => {
        const controller = new TimetableController(new RepoMock<Ride>())

        try {
            await controller.create({}, {}, { admin: true })
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(400)
        }
    })

    it(`Update all should always throw method not allowed`, async () => {
        const controller = new TimetableController(new RepoMock<Ride>())

        try {
            await controller.updateAll({}, {})
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(405)
        }
    })

    it(`Delete all should always throw method not allowed`, async () => {
        const controller = new TimetableController(new RepoMock<Ride>())

        try {
            await controller.deleteAll({})
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(405)
        }
    })
})