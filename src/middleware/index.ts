import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}
export const authenticationMiddleware = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({
        error: "Authorization is required",
      });
    }
    const token = authorization;
    const { _id } = jwt.verify(token, "express");
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      request.user = existingUser.id;
      next();
    } else {
      return response.status(401).json({
        error: "Invalid token",
      });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(401).json({
        error: "Token expired",
      });
    } else {
      console.error("Error in authenticationMiddleware:", error);
      return response.status(500).json({
        error: "Internal server error",
      });
    }
  }
};
// export const authenticationMiddleware = async (
//   request: AuthRequest,
//   response: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { authorization } = request.headers;
//     if (!authorization) {
//       return response.status(401).json({
//         error: "Authorization is required",
//       });
//     }
//     const token = authorization;
//     const { _id } = jwt.verify(token, "express");
//     const existingUser = await User.findOne({ _id });

//     if (existingUser) {
//       request.user = existingUser.id;
//     }
//     next();
//   } catch (error) {
//     console.log("error in authenticationMiddleware", error);
//     throw error;
//   }
// };
