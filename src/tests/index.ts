import "mocha"
import chai from "chai"
import Operator from "../main/models/Operator"
import OperatorController from "../main/controllers/OperatorController"
import RepoMock from "./RepoMock"

chai.should()

describe(`OperatorController`, () => {
    it(`Get by id should throw 404 Not Found when entity doesn't exist`, async () => {
        const repo = new RepoMock<Operator>()
        repo.getById = async () => null
        const controller = new OperatorController(repo)

        try {
            await controller.get("abcd", {})
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(404)
        }
    })
})