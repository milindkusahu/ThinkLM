import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

// user routes
app.use("/api/v1/users/", userRoutes);

app.listen(port, () => {
  console.log(`✅ Server is listening at PORT: ${port}`);
  db();
});
