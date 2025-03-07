import { Request, Response, Router } from "express";
import prisma from "../src/client";
import { userControllers } from "./controllers/user_controllers";

const router = Router();

// Rutas para usuarios
router.get("/schools", (req: Request, res: Response) =>
    userControllers.schools(req, res, prisma)
);
router.post("/years", (req: Request, res: Response) =>
    userControllers.years(req, res, prisma)
);
router.post("/subject", (req: Request, res: Response) =>
    userControllers.subject(req, res, prisma)
);
router.post("/topics", (req: Request, res: Response) =>
    userControllers.topics(req, res, prisma)
);
router.post("/tests", (req: Request, res: Response) =>
    userControllers.tests(req, res, prisma)
);
router.post("/summaries", (req: Request, res: Response) =>
    userControllers.summary(req, res, prisma)
);


export default router;
