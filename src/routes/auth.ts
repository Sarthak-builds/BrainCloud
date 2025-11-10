import { Router } from "express";
import { signup, signin, signinSchema, signupSchema } from "../controllers/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/signin', validate(signinSchema), signin);

export default router;