import mongoose from 'mongoose'

mongoose.Promise = global.Promise

class MongoDBInstance {
    constructor(public readonly connection: mongoose.Connection, public readonly connectionString: string){}
}

export default class MongoDB {
    public static Instance = MongoDBInstance
    public static Types = mongoose.SchemaTypes

    constructor(protected readonly dbName: string){}

    public connect(host: string = "localhost", port: number = 27017, credentials?: { user: string, password: string }): Promise<MongoDBInstance> {
        const connectionString = credentials ?
            `mongodb://${credentials.user}:${credentials.password}@${host}:${port}/${this.dbName}` :
            `mongodb://${host}:${port}/${this.dbName}`

        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString, {
                useCreateIndex: true,
                useNewUrlParser: true
            })
        
            const instance = new MongoDB.Instance(mongoose.connection, credentials ? connectionString.replace(credentials.password, "*****") : connectionString)

            instance.connection
                .once('open', () => resolve(instance))
                .on('error', (error: Error) => reject(error))
        })
    }

    public static getRepository<T>(repositoryName: string, schema: mongoose.Schema = new mongoose.Schema({ any: {} })): mongoose.Model<T & mongoose.Document, {}>{
        return mongoose.model(repositoryName, schema) as mongoose.Model<T & mongoose.Document, {}>
    }

    public static schemaOf(json: {[name: string]: any}): mongoose.Schema {
        return new mongoose.Schema(json, { versionKey: false })
    }
}