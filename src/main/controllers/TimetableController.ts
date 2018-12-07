import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Ride from "../models/Ride"
import Repository from "../datasource/Repository";

type json = {[key: string]: any}

export default class TimetableController implements Controller<Ride> {
    public resourceName: string = "rides"

    constructor(protected repo: Repository<Ride>){}
    
    public async get(id: string, _params: json): Promise<Ride> {
        const model = await this.repo.getById(id)
        if(model) return model
        else throw new HttpErrors.Client.NotFound()
    }

    public async getAll(_params: json): Promise<Ride[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json): Promise<Ride> {
        TimetableController.validateModel(model)
        return await this.repo.create(model as Ride)
    }

    public async update(id: string, model: json, _params: json): Promise<void> {
        TimetableController.validateModel(model)
        await this.repo.update(id, model as Ride)
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
        if( (!model.operator || typeof model.operator != "string") || 
            (!model.type || typeof model.type != "string") || 
            ( model.line && typeof model.line != "number") || 
            (!model.stops) || 
            (!model.excludeDays) || 
            (!model.departures) )
            throw new HttpErrors.Client.BadRequest()
    }
}