import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
dotenv.config();

const PORT = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Req Method is ${req.method} and Req Url is ${req.url}`);
  next();
});

app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
