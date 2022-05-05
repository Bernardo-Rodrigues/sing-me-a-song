import supertest, { Response } from "supertest";
import app from "../../src/app.js"
import { prisma } from "../../src/database.js"

const agent = supertest(app);

describe("#Api - test suit for api integrations", () => {
    beforeEach( async () => {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
        const createRecommendationsData = [
            {name: "Phaxe", youtubeLink: "https://www.youtube.com/results?search_query=phaxe+universo+paralello", score: 2},
            {name: "Vegas", youtubeLink: "https://www.youtube.com/watch?v=6bRGO7r0E-Y&t=167s", score: 1},
            {name: "Michale Bibi", youtubeLink: "https://www.youtube.com/watch?v=sGPiGy6QU4Y&t=1512s", score: 3}
        ]
        await prisma.recommendation.createMany({
            data: createRecommendationsData
        });
    })

    it("POST /recommentadions - should create a new recommendation", async () => {
        const createRecommendationData = {name: "Mandragora", youtubeLink: "https://www.youtube.com/watch?v=ubJv8PM6Ia8"}

        const response = await agent.post("/recommendations").send(createRecommendationData)
        const createdRecommendations = await prisma.recommendation.findUnique({ where: { name: createRecommendationData.name  } })

        expect(createdRecommendations).not.toBeNull();
        expect(response.status).toBe(201);
    })

    it("GET /recommentadions - should list all recommendations", async () => {
        const response = await agent.get("/recommendations")

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

    it("GET /recommentadions/random - should list one recommendation", async () => {
        const response = await agent.get("/recommendations/random")

        expect(response.status).toBe(200);
        expect(response.body).not.toBeUndefined();
    })

    it("GET /recommentadions/top/:amount - should list top recommendations by score", async () => {
        const response = await agent.get("/recommendations/top/2")

        const first = response.body[0]
        const second = response.body[1]

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(first.score).toBeGreaterThan(second.score)
    })

    it("GET /recommentadions/:id - should get one recommendation", async () => {
        const createRecommendationData = {name: "Mandragora", youtubeLink: "https://www.youtube.com/watch?v=ubJv8PM6Ia8"}
        const createdRecommendation = await prisma.recommendation.create({
            data: createRecommendationData
        });

        const response = await agent.get(`/recommendations/${createdRecommendation.id}`)
        const recommendation = response.body

        expect(response.status).toBe(200);
        expect(response.body).not.toBeUndefined();
        expect(recommendation.id).toBe(createdRecommendation.id)
    })

    it("POST /recommentadions/:id/upvote - should increase the score of a recommendation", async () => {
        const createRecommendationData = {name: "Mandragora", youtubeLink: "https://www.youtube.com/watch?v=ubJv8PM6Ia8"}
        const createdRecommendation = await prisma.recommendation.create({
            data: createRecommendationData
        });

        const response = await agent.post(`/recommendations/${createdRecommendation.id}/upvote`)
        const upvotedRecommendation = await prisma.recommendation.findUnique({
            where:{
                name: createdRecommendation.name
            }
        });

        expect(response.status).toBe(200);
        expect(upvotedRecommendation.score).toBe(createdRecommendation.score + 1)
    })

    it("POST /recommentadions/:id/downvote - should decrease the schore of a recommendation", async () => {
        const createRecommendationData = {name: "Mandragora", youtubeLink: "https://www.youtube.com/watch?v=ubJv8PM6Ia8"}
        const createdRecommendation = await prisma.recommendation.create({
            data: createRecommendationData
        });


        const response = await agent.post(`/recommendations/${createdRecommendation.id}/downvote`)
        const downvotedRecommendation = await prisma.recommendation.findUnique({
            where:{
                name: createdRecommendation.name
            }
        });

        expect(response.status).toBe(200);
        expect(downvotedRecommendation.score).toBe(createdRecommendation.score - 1)
    })

    it("POST /reset-database - should reset the database", async () => {
        const response = await agent.post(`/reset-database`)
        const recommendations = await prisma.recommendation.findMany();

        expect(response.status).toBe(200);
        expect(recommendations.length).toBe(0)
    })
})