import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import appointmentRoutes from "./routes/appointment.routes";
import userRoutes from "./routes/user.routes";
import publicRoutes from "./routes/public.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/public", publicRoutes);

// Error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Agenda PRO");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
