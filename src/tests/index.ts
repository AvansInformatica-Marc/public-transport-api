import * as chai from "chai"
import "mocha";
import Operator from "../main/models/Operator";
import Repository from "../main/datasource/Repository"
import OperatorController from "../main/controllers/OperatorController"
import Exception from "@peregrine/exceptions"

chai.should()

class NotImplementedException extends Exception {
    constructor(){
        super("NotImplementedException", "This method was not implemented")
    }
}

class RepoMock<T> implements Repository<T> {
    public async getById(id: string): Promise<T | null> {
        throw new NotImplementedException()
    }

    public async getAll(): Promise<T[]> {
        throw new NotImplementedException()
    }

    public async create(model: T): Promise<T> {
        throw new NotImplementedException()
    }

    public async update(id: string, model: T): Promise<T | null> {
        throw new NotImplementedException()
    }

    public async delete(id: string): Promise<T | null> {
        throw new NotImplementedException()
    }
}

describe(`OperatorController`, () => {
    it(`Get by id should throw 404 Not Found when entity doesn't exist`, () => {
        const repo = new RepoMock<Operator>()
        repo.getById = async () => null
        const controller = new OperatorController(repo)

        try {
            controller.get("abcd", {})
        } catch (error) {
            error.should.have.property("code").that.is.a("number").which.equals(404)
        }
    })
})