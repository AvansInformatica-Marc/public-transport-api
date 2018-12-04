import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Operator from "../models/Operator"
import MongoDB from "../datasource/MongoDB"

type json = {[key: string]: any}

const types = MongoDB.Types
const OperatorRepository = MongoDB.getRepository<Operator>("operators", MongoDB.schemaOf({name: types.String}))

export default class OperatorController implements Controller<Operator> {
    public resourceName: string = "operators"
    
    public async get(id: string, _params: json): Promise<Operator> {
        const model = await OperatorRepository.findById(id)
        if(model) return model
        else throw new HttpErrors.Client.NotFound()
    }

    public async getAll(_params: json): Promise<Operator[]> {
        return await OperatorRepository.find()
    }

    public async create(model: json, _params: json): Promise<Operator> {
        OperatorController.validateModel(model)
        return await OperatorRepository.create(model)
    }

    public async update(id: string, model: json, _params: json): Promise<void> {
        OperatorController.validateModel(model)
        await OperatorRepository.findByIdAndUpdate(id, model)
    }

    public updateAll(_model: json, _params: json): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    public async delete(id: string, _params: json): Promise<void> {
        await OperatorRepository.findByIdAndDelete(id)
    }

    public deleteAll(_params: json): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    protected static validateModel(model: json){
        if(!model.name && typeof model.name != "string")
            throw new HttpErrors.Client.BadRequest()
    }
}