import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
