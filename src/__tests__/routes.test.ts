import app from "../server"
import supertest from "supertest"

describe("GET /", () => {
    it("should send back some data",async () => {
        const res = await supertest(app).get("/")
        expect(res.body.message).toBe("Hello!")
        expect(res.status).toEqual(200)
        // expect(res.body.data).toEqual("Hello World")        
    })
})