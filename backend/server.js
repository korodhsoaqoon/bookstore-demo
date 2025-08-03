import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bookRoute from "./routes/book.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

const __dirname = path.resolve();
app.use("/api/books", bookRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
 connectDB();
app.listen(PORT, () => {
 
  console.log(`Server is running on port ${PORT}`);
});


