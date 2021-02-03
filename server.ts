import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import routes from "./routes";
import connectDB from "./config/db";

// Connect to the database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api routes middleware
app.use("/api", routes);

// PRODUCTION DEPLOYMENT
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  );
}
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
