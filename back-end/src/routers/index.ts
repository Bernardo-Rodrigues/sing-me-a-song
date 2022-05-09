import { Router } from "express";
import recommendationRouter from "./recommendationRouter.js";
import testsRouter from "./testsRouter.js";

const router = Router();

router.use("/recommendations", recommendationRouter);
if (process.env.NODE_ENV === "tests") {
  router.use(testsRouter);
}

export default router;
