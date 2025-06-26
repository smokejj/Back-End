import { userController } from "../controllers/userController";
import { Router } from "express";

const controller = new userController();
const router = Router();

router.post("/user", controller.createUser);
router.post("/user/login", controller.Login);
router.get("/user", controller.listUser);

export default router;