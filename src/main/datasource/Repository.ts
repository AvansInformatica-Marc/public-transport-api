import { Entity } from "./mongo/Entity";

export default interface Repository<T> {
    getById(id: string): Promise<Entity<T> | null>
    getAll(): Promise<Entity<T>[]>
    create(model: T): Promise<Entity<T>>
    update(id: string, model: T): Promise<Entity<T> | null> 
    delete(id: string): Promise<Entity<T> | null> 
}