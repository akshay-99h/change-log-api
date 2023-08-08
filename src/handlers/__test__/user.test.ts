import * as user from "../user"

// Unit Testing

describe('user handler', () => {
    it("should create a new user", async () => {
        const req = { body: { username: "ak", password: "hi" } }
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            }
        }
    await user.createNewUser(req, res);
    })
    })