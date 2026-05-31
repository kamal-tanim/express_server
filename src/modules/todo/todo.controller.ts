import { Request, Response } from "express";
import { todoService } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  // console.log(req.body)
  const { user_id, title } = req.body;

  try {
    const result = await todoService.createTodo(user_id, title);

    res.status(201).json({
      success: true,
      message: "Todos Created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getAllTodo();

    res.status(200).json({
      success: true,
      message: "Todos Retrieved Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoService.getSingleTodo(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const completed = true;
  const id = req.params.id;

  try {
    const result = await todoService.updateTodo(title, completed, id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoService.deleteTodo(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

export const todoController = {
  createTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
