import { checkForUrl } from "..//client/js/checkForUrl";

describe("Testing the URL functionality", () => {
    test("Testing the checkForUrl() function", () => {
        expect(checkForUrl("https://test.com")).toBe(true);
    })
});