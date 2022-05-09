import { jest, describe, it, expect } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { notFoundError } from "../../src/utils/errorUtils.js";

describe("#Recommendation Service - test suit for edge processing", () => {
  it("#upvote - should throw notFoundError given non-existing recommendation id", () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    expect(recommendationService.upvote(1)).rejects.toEqual(notFoundError());
  });

  it("#downvote - should throw notFoundError given non-existing recommendation id", () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    expect(recommendationService.downvote(1)).rejects.toEqual(notFoundError());
  });

  it("#downvote - should remove a recommendation given its score is less than -5", async () => {
    const recommendation = {
      id: 1,
      name: "teste",
      youtubeLink: "teste",
      score: -6,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);
    jest.spyOn(recommendationRepository, "updateScore").mockResolvedValue(null);
    const remove = jest
      .spyOn(recommendationRepository, "remove")
      .mockResolvedValue(null);

    await recommendationService.downvote(1);

    expect(remove).toBeCalledWith(1);
  });

  it("#getRandom - should throw notFoundError given as there are no recommendations", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.6);
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    expect(recommendationService.getRandom()).rejects.toEqual(notFoundError());
  });
});
