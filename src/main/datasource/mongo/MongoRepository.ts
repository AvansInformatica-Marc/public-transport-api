import mongoose from 'mongoose'
import MongoDB from "./MongoDB";
import Repository from "../Repository"
import { Entity } from './Entity';

type json = {[key: string]: any}

export default class MongoRepository<T> implements Repository<T> {
    protected mongoRepo: mongoose.Model<T & mongoose.Document, {}>

    constructor(public collectionName: string, schema: json){
        this.mongoRepo = mongoose.model(collectionName, MongoDB.schemaOf(schema)) as mongoose.Model<T & mongoose.Document, {}>
    }

    public async getById(id: string): Promise<Entity<T> | null> {
        return await this.mongoRepo.findById(id)
    }

    public async getAll(): Promise<Entity<T>[]> {
        return await this.mongoRepo.find()
    }

    public async create(model: T): Promise<Entity<T>> {
        return await this.mongoRepo.create(model)
    }

    public async update(id: string, model: T): Promise<Entity<T> | null> {
        return await this.mongoRepo.findByIdAndUpdate(id, model)
    }

    public async delete(id: string): Promise<Entity<T> | null> {
        return await this.mongoRepo.findByIdAndDelete(id)
    }
}