import { Request, Response } from "express";
import { db } from "../config/db";

export const createPatient = async (req: Request, res: Response) => {
  const { nombre, edad, motivo_consulta } = req.body;

  await db.query(
    "INSERT INTO patients (nombre, edad, motivo_consulta) VALUES (?, ?, ?)",
    [nombre, edad, motivo_consulta]
  );

  res.json({ message: "Paciente creado" });
};

export const getPatients = async (_req: Request, res: Response) => {
  const [rows] = await db.query("SELECT * FROM patients");
  res.json(rows);
};

export const getPatientById = async (req: Request, res: Response) => {
  const [rows]: any = await db.query(
    "SELECT * FROM patients WHERE id = ?",
    [req.params.id]
  );
  res.json(rows[0]);
};

export const updatePatient = async (req: Request, res: Response) => {
  const { nombre, edad, motivo_consulta } = req.body;

  await db.query(
    "UPDATE patients SET nombre=?, edad=?, motivo_consulta=? WHERE id=?",
    [nombre, edad, motivo_consulta, req.params.id]
  );

  res.json({ message: "Paciente actualizado" });
};

export const deletePatient = async (req: Request, res: Response) => {
  await db.query(
    "DELETE FROM patients WHERE id = ?",
    [req.params.id]
  );

  res.json({ message: "Paciente eliminado" });
};
