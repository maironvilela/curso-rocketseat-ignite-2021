import { Router } from "express";
import multer from "multer";

import multerConfig from "@config/upload";
import CreateUserController from "@modules/acount/useCases/createUser/CreateUserController";
import ListUserController from "@modules/acount/useCases/listUsers/ListUserController";
import UpdateUserAvatarController from "@modules/acount/useCases/updateUserAvatar/UpdadeUserAvatarContoller";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();
const upload = multer(multerConfig.upload("avatar"));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthentication, listUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
