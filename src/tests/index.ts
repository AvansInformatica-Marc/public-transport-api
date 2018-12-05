import * as chai from "chai"
import "mocha";
import Operator from "../main/models/Operator";

chai.should()

describe(`Unit tests`, () => {
    it(`Test 1`, () => {
        new Operator("Test").should.have.property('name').that.is.a('string').which.equals('Test')
    })
})