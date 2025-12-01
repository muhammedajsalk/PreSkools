// src/modules/user/login.controller.ts
import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  const result = await loginService(token);
  res.status(200).json(result);
};
