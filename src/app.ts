import express from "express";
import initDB from "./config/db";
import { userRoute } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();
//  parse
app.use(express.json());

// initializing DB
initDB();

// users crud
app.use("/users", userRoute);

// todos crud
app.use("/todos", todoRoutes);

// auth routes
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({
    success: false,
    message: "api not matched",
    path: req.path,
  });
});

export default app;
