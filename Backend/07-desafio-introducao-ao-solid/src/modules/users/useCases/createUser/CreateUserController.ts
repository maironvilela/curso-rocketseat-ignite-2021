import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  private user = {};

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    if (!email || !name) {
      return response.status(400).json({ error: "name or email not informed" });
    }
    try {
      this.user = this.createUserUseCase.execute({ email, name });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(201).json(this.user);
  }
}

export { CreateUserController };
