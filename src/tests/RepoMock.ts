import Repository from "../main/datasource/Repository"
import { NotImplementedException } from "@peregrine/exceptions"
import { Entity } from "../main/models/db/Entity";

export default class RepoMock<T> implements Repository<T> {
    public async getById(_id: string): Promise<Entity<T> | null> {
        throw new NotImplementedException()
    }

    public async getAll(): Promise<Entity<T>[]> {
        throw new NotImplementedException()
    }

    public async create(_model: T): Promise<Entity<T>> {
        throw new NotImplementedException()
    }

    public async update(_id: string, _model: T): Promise<Entity<T> | null> {
        throw new NotImplementedException()
    }

    public async delete(_id: string): Promise<Entity<T> | null> {
        throw new NotImplementedException()
    }
}