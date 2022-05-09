import { prisma } from "../../src/database";

export function createRecommendationData() {
  return {
    name: "Mandragora",
    youtubeLink: "https://www.youtube.com/watch?v=ubJv8PM6Ia8",
  };
}

export async function createRecommendation() {
  const recommendationData = createRecommendationData();
  const createdRecommendation = await prisma.recommendation.create({
    data: recommendationData,
  });

  return createdRecommendation;
}
