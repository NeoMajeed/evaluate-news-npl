import { handleSubmit } from "../client/js/formHandler"

//test function
describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    });
});