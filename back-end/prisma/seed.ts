import { prisma } from "../src/database";

export default async function seed() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Phaxe",
        youtubeLink:
          "https://www.youtube.com/results?search_query=phaxe+universo+paralello",
        score: 2,
      },
      {
        name: "Vegas",
        youtubeLink: "https://www.youtube.com/watch?v=6bRGO7r0E-Y&t=167s",
        score: 1,
      },
      {
        name: "Michale Bibi",
        youtubeLink: "https://www.youtube.com/watch?v=sGPiGy6QU4Y&t=1512s",
        score: 3,
      },
    ],
  });
}
