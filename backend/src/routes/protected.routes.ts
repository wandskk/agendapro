import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

export default router;
