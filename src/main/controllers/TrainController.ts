import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Train from "../models/Train"
import Repository from "../datasource/Repository";
import Operator from "../models/Operator";
import { Entity } from "../datasource/mongo/Entity";

type json = {[key: string]: any}

export default class TrainController implements Controller<Train, Entity<Operator>> {
    public resourceName: string = "trains"

    constructor(protected repo: Repository<Train>){}
    
    public async get(id: string, _params: json, _auth?: Entity<Operator>): Promise<Train> {
        const model = await this.repo.getById(id)
        if(!model) throw new HttpErrors.Client.NotFound()
        return model
    }

    public async getAll(_params: json, _auth?: Entity<Operator>): Promise<Train[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json, auth?: Entity<Operator>): Promise<Train> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const train = this.validateModel(model)
        return await this.repo.create(train)
    }

    public async update(id: string, model: json, _params: json, auth?: Entity<Operator>): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const train = this.validateModel(model)
        await this.repo.update(id, train)
    }

    public updateAll(_model: json, _params: json, _auth?: Entity<Operator>): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    public async delete(id: string, _params: json, auth?: Entity<Operator>): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        await this.repo.delete(id)
    }

    public deleteAll(_params: json, _auth?: Entity<Operator>): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    protected validateModel(model: json): Train {
        if( (!model.name || typeof model.name != "string") || 
            (!model.manufacturer || typeof model.manufacturer != "string") || 
            (!model.length || typeof model.length != "number") || 
            ( model.image && typeof model.image != "string") )
            throw new HttpErrors.Client.BadRequest()

        return model as Train
    }
}