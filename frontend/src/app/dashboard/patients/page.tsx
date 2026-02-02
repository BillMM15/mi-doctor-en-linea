"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { isAuthenticated } from "@/utils/auth";

interface Patient {
  id: number;
  nombre: string;
  edad: number;
  motivo_consulta: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    loadPatients();
  }, []);

  const loadPatients = async () => {
    const data = await api("patients");
    setPatients(data);
  };

  const deletePatient = async (id: number) => {
    await api(`patients/${id}`, { method: "DELETE" });
    alert("Paciente eliminado");
    loadPatients();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const body = {
    nombre,
    edad: Number(edad),
    motivo_consulta: motivo,
  };

  if (editingId) {
    // EDITAR
    await api(`patients/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    alert("Paciente actualizado");
  } else {
    // CREAR
    await api("patients", {
      method: "POST",
      body: JSON.stringify(body),
    });
    alert("Paciente creado");
  }

  resetForm();
  loadPatients();
};


const editPatient = (patient: Patient) => {
  setEditingId(patient.id);
  setNombre(patient.nombre);
  setEdad(patient.edad.toString());
  setMotivo(patient.motivo_consulta);
};

const resetForm = () => {
  setNombre("");
  setEdad("");
  setMotivo("");
  setEditingId(null);
};



  return (
    <div>
      <h1>Pacientes</h1>

      <h2>{editingId ? "Editar Paciente" : "Nuevo Paciente"}</h2>

    <form onSubmit={handleSubmit}>
        <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />

        <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
        />

        <input
            placeholder="Motivo de consulta"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
        />

        <button type="submit">
            {editingId ? "Actualizar" : "Crear"}
        </button>

        {editingId && (
            <button type="button" onClick={resetForm}>
            Cancelar
            </button>
        )}
        </form>

      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
              <td>{p.motivo_consulta}</td>
              <td>
                <button onClick={() => editPatient(p)}>Editar</button>
                <button onClick={() => deletePatient(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
