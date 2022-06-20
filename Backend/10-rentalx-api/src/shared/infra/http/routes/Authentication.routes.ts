import { Router } from "express";

import AuthenticationUserController from "@modules/acount/useCases/autenticationUser/AuthenticationUserController";
import RefreshTokenController from "@modules/acount/useCases/refreshToken/RefreshTokenController";

const authenticationRoutes = Router();
const authenticationUserController = new AuthenticationUserController();
const refreshTokenController = new RefreshTokenController();

authenticationRoutes.post("/session", authenticationUserController.handle);

authenticationRoutes.post("/refresh_token", refreshTokenController.handle);

export { authenticationRoutes };
