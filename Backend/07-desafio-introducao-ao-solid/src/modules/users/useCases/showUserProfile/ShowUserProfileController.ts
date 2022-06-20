import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  private user = {};

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      this.user = this.showUserProfileUseCase.execute({ user_id });
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }

    return response.status(200).json(this.user);
  }
}

export { ShowUserProfileController };
