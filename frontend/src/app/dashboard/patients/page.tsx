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
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    loadPatients();
  }, []);

  const loadPatients = async () => {
    const data = await api("/patients");
    setPatients(data);
  };

  const deletePatient = async (id: number) => {
    await api(`/patients/${id}`, { method: "DELETE" });
    alert("Paciente eliminado");
    loadPatients();
  };

  return (
    <div>
      <h1>Pacientes</h1>

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
