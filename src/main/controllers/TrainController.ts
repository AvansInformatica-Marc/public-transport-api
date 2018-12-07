import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Train from "../models/Train"
import Repository from "../datasource/Repository";

type json = {[key: string]: any}

export default class TrainController implements Controller<Train> {
    public resourceName: string = "trains"

    constructor(protected repo: Repository<Train>){}
    
    public async get(id: string, _params: json): Promise<Train> {
        const model = await this.repo.getById(id)
        if(model) return model
        else throw new HttpErrors.Client.NotFound()
    }

    public async getAll(_params: json): Promise<Train[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json): Promise<Train> {
        TrainController.validateModel(model)
        return await this.repo.create(model as Train)
    }

    public async update(id: string, model: json, _params: json): Promise<void> {
        TrainController.validateModel(model)
        await this.repo.update(id, model as Train)
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
        if( (!model.name || typeof model.name != "string") || 
            (!model.manufacturer || typeof model.manufacturer != "string") || 
            (!model.length || typeof model.length != "number") || 
            ( model.image && typeof model.image != "string") )
            throw new HttpErrors.Client.BadRequest()
    }
}