import { AuthHandler } from "@peregrine/webserver"
import Operator from "./models/Operator"
import { Request } from "express";
import Repository from "./datasource/Repository";
import { Entity } from "./models/db/Entity";

export default class OperatorAuthHandler implements AuthHandler<Entity<Operator>> {
    constructor(protected operatorRepo: Repository<Operator>){}

    public async getAuth(request: Request): Promise<Entity<Operator> | undefined> {
        const token = this.getTokenFromRequest(request)
        return token ? await this.getOperatorFromToken(token) : undefined
    }

    protected getTokenFromRequest(request: Request): string | null {
        const header = request.header("Authorization")
        return header && header.includes("Bearer ") ? header.replace("Bearer ", "") : null
    }

    protected async getOperatorFromToken(token: string): Promise<Entity<Operator> | undefined> {
        const operators = await this.operatorRepo.getAll()
        return operators.find(it => it.name == token) as Entity<Operator> || undefined
    }
}