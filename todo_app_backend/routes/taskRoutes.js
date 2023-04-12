import express from "express";

import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controller/taskController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my-tasks", isAuthenticated, getMyTasks);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
