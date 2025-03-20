import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


export const validateUser = [
  body("name").optional().isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Not valid data", errors: errors.array() })
      return;
     
    }
    next();
  }
];


