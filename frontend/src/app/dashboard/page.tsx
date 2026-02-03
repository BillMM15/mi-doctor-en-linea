"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/utils/auth";


export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="container">
    <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <img
      src="/Logo_MiDocEnLinea.png"
      alt="Mi Doctor en Línea"
      style={{ width: "90px", marginRight: "10px" }}
    />
    <h1>Bienvenido al Sistema Mi Doctor en Línea</h1>
  </div>

      <button onClick={() => router.push("/dashboard/patients")}>
        Pacientes
      </button>

      <button onClick= {logout}>
        Cerrar Sesión
      </button>
    </div>
  );
}
