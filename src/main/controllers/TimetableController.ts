import { Controller } from "@peregrine/webserver"
import { HttpErrors } from "@peregrine/exceptions"
import Ride from "../models/Ride"
import Repository from "../datasource/Repository";
import Operator from "../models/Operator";
import { Entity } from "../models/db/Entity";

type json = {[key: string]: any}

export default class TimetableController implements Controller<Entity<Ride>, Entity<Operator> | { admin: true }> {
    public resourceName: string = "rides"

    constructor(protected repo: Repository<Ride>){}
    
    public async get(id: string, _params: json, _auth?: Entity<Operator> | { admin: true }): Promise<Entity<Ride>> {
        const model = await this.repo.getById(id)
        if(!model) throw new HttpErrors.Client.NotFound()
        return model
    }

    public async getAll(params: json, _auth?: Entity<Operator> | { admin: true }): Promise<Entity<Ride>[]> {
        const list = await this.repo.getAll()
        return params.stopId ? list.filter(item => item.stops.some(stop => stop.stop == params.stopId)) : list
    }

    public async create(model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<Entity<Ride>> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        const ride = this.validateModel(model)
        if((auth as { _id?: string })._id) ride.operator = (auth as { _id: string })._id
        return await this.repo.create(ride)
    }

    public async update(id: string, model: json, _params: json, auth?: Entity<Operator> | { admin: true }): Promise<void> {
        if(!auth) throw new HttpErrors.Client.Unauthorised()
        if(!(await this.hasEditRights(id, auth))) throw new HttpErrors.Client.Forbidden()
        const ride = this.validateModel(model)
        if((auth as { _id?: string })._id) ride.operator = (auth as { _id: string })._id
        await this.repo.update(id, ride)
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
        return model != null && model.operator.toString() == (auth as Entity<Operator>)._id.toString()
    }

    protected validateModel(model: json): Ride {
        if( (!model.type || typeof model.type != "string") || 
            ( model.line && typeof model.line != "number") || 
            (!model.stops) || 
            (!model.excludeDays) || 
            (!model.departures) )
            throw new HttpErrors.Client.BadRequest()
        
        return model as Ride
    }
}