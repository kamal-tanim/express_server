import { Request, Response } from "express";
import { userService } from "./user.service";

const createUsers = async (req: Request, res: Response) => {
  // const { name, email } = req.body;

  try {
    const result = await userService.crateUsers(req.body);

    const data = result.rows[0];
    // console.log(data);
    res.status(201).json({
      success: true,
      message: "data inserted successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => { 
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.getSingleUser(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    const result = await userService.updateUser(name, email, id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated Successful",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  createUsers,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
