import Exception from "@peregrine/exceptions"

export default class NotImplementedException extends Exception {
    constructor(){
        super("NotImplementedException", "This method was not implemented")
    }
}