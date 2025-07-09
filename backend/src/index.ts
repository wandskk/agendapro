import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";
import router from "./routes";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", router);

// Error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Agenda PRO");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
