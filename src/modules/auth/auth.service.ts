import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const mach = await bcrypt.compare(password, user.password);

  if (!mach) {
    return false;
  }

  // const secret = "";
  const token = jwt.sign(
    { name: user.name, email: user.email, role:user.role },
    config.jwtSecret as string,
    { expiresIn: "7d" },
  );

  console.log({ token, user });

  return { token, user };
};

export const authService = {
  loginUser,
};
