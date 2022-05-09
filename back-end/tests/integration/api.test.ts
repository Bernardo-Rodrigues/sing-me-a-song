import supertest from "supertest";
import { describe, it, expect, beforeEach } from "@jest/globals";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import seed from "../../prisma/seed.js";
import {
  createRecommendation,
  createRecommendationData,
} from "../factories/recommendation.js";

const agent = supertest(app);

async function findRecommendationByName(name: string) {
  const recommendation = await prisma.recommendation.findUnique({
    where: {
      name,
    },
  });

  return recommendation;
}

describe("#Api - test suit for api integrations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
    await seed();
  });

  it("POST /recommentadions - should create a new recommendation", async () => {
    const recommendationData = createRecommendationData();

    const response = await agent
      .post("/recommendations")
      .send(recommendationData);
    const createdRecommendations = await findRecommendationByName(
      recommendationData.name
    );

    expect(createdRecommendations).not.toBeNull();
    expect(response.status).toBe(201);
  });

  it("GET /recommentadions - should list all recommendations", async () => {
    const response = await agent.get("/recommendations");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /recommentadions/random - should list one recommendation", async () => {
    const response = await agent.get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body).not.toBeUndefined();
  });

  it("GET /recommentadions/top/:amount - should list top recommendations by score", async () => {
    const response = await agent.get("/recommendations/top/2");

    const [first, second] = response.body;

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(first.score).toBeGreaterThan(second.score);
  });

  it("GET /recommentadions/:id - should get one recommendation", async () => {
    const createdRecommendation = await createRecommendation();

    const response = await agent.get(
      `/recommendations/${createdRecommendation.id}`
    );
    const recommendation = response.body;

    expect(response.status).toBe(200);
    expect(response.body).not.toBeUndefined();
    expect(recommendation.id).toBe(createdRecommendation.id);
  });

  it("POST /recommentadions/:id/upvote - should increase the score of a recommendation", async () => {
    const createdRecommendation = await createRecommendation();

    const response = await agent.post(
      `/recommendations/${createdRecommendation.id}/upvote`
    );
    const upvotedRecommendation = await findRecommendationByName(
      createdRecommendation.name
    );

    expect(response.status).toBe(200);
    expect(upvotedRecommendation.score).toBe(createdRecommendation.score + 1);
  });

  it("POST /recommentadions/:id/downvote - should decrease the schore of a recommendation", async () => {
    const createdRecommendation = await createRecommendation();

    const response = await agent.post(
      `/recommendations/${createdRecommendation.id}/downvote`
    );
    const downvotedRecommendation = await findRecommendationByName(
      createdRecommendation.name
    );

    expect(response.status).toBe(200);
    expect(downvotedRecommendation.score).toBe(createdRecommendation.score - 1);
  });

  it("POST /reset-database - should reset the database", async () => {
    const response = await agent.post(`/reset-database`);
    const recommendations = await prisma.recommendation.findMany();

    expect(response.status).toBe(200);
    expect(recommendations.length).toBe(0);
  });
});
