import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Stop from "../models/Stop"
import Repository from "../datasource/Repository";
import Operator from "../models/Operator";
import { Entity } from "../models/db/Entity";

type json = {[key: string]: any}

export default class StopController implements Controller<Entity<Stop>, Entity<Operator> | { admin: true }> {
    public resourceName: string = "stops"

    constructor(protected repo: Repository<Stop>){}
    
    public async get(id: string, _params: json, _auth?: Entity<Operator> | { admin: true }): Promise<Entity<Stop>> {
        const model = await this.repo.getById(id)
        if(!model) throw new HttpErrors.Client.NotFound()
        return model
    }

    public async getAll(_params: json, _auth?: Entity<Operator> | { admin: true }): Promise<Entity<Stop>[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<Entity<Stop>> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const stop = this.validateModel(model)
        return await this.repo.create(stop)
    }

    public async update(id: string, model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const stop = this.validateModel(model)
        await this.repo.update(id, stop)
    }

    public updateAll(_model: json, _params: json, _auth?: Entity<Operator> | { admin: true }): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    public async delete(id: string, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        await this.repo.delete(id)
    }

    public deleteAll(_params: json, _auth?: Entity<Operator> | { admin: true }): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    protected validateModel(model: json): Stop {
        if( (!model.name || typeof model.name != "string") )
            throw new HttpErrors.Client.BadRequest()
        return model as Stop
    }
}