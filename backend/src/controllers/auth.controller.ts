import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db";

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, hash]
  );

  res.json({ message: "Usuario registrado" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
