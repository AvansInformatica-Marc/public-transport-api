import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Operator from "../models/Operator"
import Repository from "../datasource/Repository";

type json = {[key: string]: any}

export default class OperatorController implements Controller<Operator> {
    public resourceName: string = "operators"

    constructor(protected repo: Repository<Operator>){}
    
    public async get(id: string, _params: json): Promise<Operator> {
        const model = await this.repo.getById(id)
        if(model) return model
        else throw new HttpErrors.Client.NotFound()
    }

    public async getAll(_params: json): Promise<Operator[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json): Promise<Operator> {
        OperatorController.validateModel(model)
        return await this.repo.create(model as Operator)
    }

    public async update(id: string, model: json, _params: json): Promise<void> {
        OperatorController.validateModel(model)
        await this.repo.update(id, model as Operator)
    }

    public updateAll(_model: json, _params: json): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    public async delete(id: string, _params: json): Promise<void> {
        await this.repo.delete(id)
    }

    public deleteAll(_params: json): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    protected static validateModel(model: json){
        if(!model.name && typeof model.name != "string")
            throw new HttpErrors.Client.BadRequest()
    }
}