import { UserController } from "../controllers/userController";
import { Router } from "express";

const controller = new UserController();
const router = Router();

router.post("/users", controller.createUser);
router.post("/usersLogin", controller.Login);
router.get("/users", controller.listUser);

export default router;