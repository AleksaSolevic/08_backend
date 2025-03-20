import { body, validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return; 
    }
    next();
  },
];