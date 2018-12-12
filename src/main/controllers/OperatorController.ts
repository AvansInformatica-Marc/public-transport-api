import { Controller, Status } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Operator from "../models/Operator"
import Repository from "../datasource/Repository";
import { Entity } from "../models/db/Entity";

type json = {[key: string]: any}

export default class OperatorController implements Controller<Entity<Operator>, Entity<Operator> | { admin: true }> {
    public resourceName: string = "operators"

    constructor(protected repo: Repository<Operator>){}
    
    public async get(id: string, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<Entity<Operator>> {
        if(id == "@me" && auth) return auth as Entity<Operator>
        const model = await this.repo.getById(id)
        if(!model) throw new HttpErrors.Client.NotFound()
        return model
    }

    public async getAll(_params: json, _auth?: Entity<Operator> | { admin: true }): Promise<Entity<Operator>[]> {
        return await this.repo.getAll()
    }

    public async create(model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<Entity<Operator>> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const operator = this.validateModel(model)
        return await this.repo.create(operator)
    }

    public async update(id: string, model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        if(!(await this.hasEditRights(id, auth))) throw new HttpErrors.Client.Forbidden()
        const operator = this.validateModel(model)
        await this.repo.update(id, operator)
    }

    public updateAll(_model: json, _params: json, _auth?: Entity<Operator> | { admin: true }): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    public async delete(id: string, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        if(!(await this.hasEditRights(id, auth))) throw new HttpErrors.Client.Forbidden()
        await this.repo.delete(id)
    }

    public deleteAll(_params: json, _auth?: Entity<Operator> | { admin: true }): void | Promise<void> {
        throw new HttpErrors.Client.MethodNotAllowed()
    }

    protected async hasEditRights(id: string, auth: Entity<Operator> | { admin: true }): Promise<boolean> {
        if((auth as { admin?: boolean }).admin) return true
        const model = await this.repo.getById(id)
        return model != null && model._id.toString() == (auth as Entity<Operator>)._id.toString()
    }

    protected validateModel(model: json): Operator {
        if( (!model.name || typeof model.name != "string") || 
            ( model.logo && typeof model.logo != "string") )
            throw new HttpErrors.Client.BadRequest()
        return model as Operator
    }
}