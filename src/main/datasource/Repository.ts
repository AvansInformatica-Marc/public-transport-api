export default interface Repository<T> {
    getById(id: string): Promise<T | null>
    getAll(): Promise<T[]>
    create(model: T): Promise<T>
    update(id: string, model: T): Promise<T | null> 
    delete(id: string): Promise<T | null> 
}