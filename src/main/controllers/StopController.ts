import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Stop from "../models/Stop"
import Repository from "../datasource/Repository";

type json = {[key: string]: any}

export default class StopController implements Controller<Stop> {
    public resourceName: string = "stops"

    constructor(protected repo: Repository<Stop>){}
    
    public async get(id: string, _params: json): Promise<Stop> {
        const model = await this.repo.getById(id)
        if(model) return model
        else throw new HttpErrors.Client.NotFound()
    }

    public async getAll(_params: json): Promise<Stop[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json): Promise<Stop> {
        StopController.validateModel(model)
        return await this.repo.create(model as Stop)
    }

    public async update(id: string, model: json, _params: json): Promise<void> {
        StopController.validateModel(model)
        await this.repo.update(id, model as Stop)
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
        if( (!model.name || typeof model.name != "string") )
            throw new HttpErrors.Client.BadRequest()
    }
}