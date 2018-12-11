import { ID } from "./ID";

export type Entity<T> = T & { _id: ID }