import Repository from "../main/datasource/Repository"
import NotImplementedException from "./NotImplementedException"

export default class RepoMock<T> implements Repository<T> {
    public async getById(_id: string): Promise<T | null> {
        throw new NotImplementedException()
    }

    public async getAll(): Promise<T[]> {
        throw new NotImplementedException()
    }

    public async create(_model: T): Promise<T> {
        throw new NotImplementedException()
    }

    public async update(_id: string, _model: T): Promise<T | null> {
        throw new NotImplementedException()
    }

    public async delete(_id: string): Promise<T | null> {
        throw new NotImplementedException()
    }
}