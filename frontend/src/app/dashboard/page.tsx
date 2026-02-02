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
    <div>
      <h1>Bienvenido al Sistema Mi Doctor en Línea</h1>

      <button onClick={() => router.push("/dashboard/patients")}>
        Pacientes
      </button>

      <button onClick= {logout}>
        Cerrar Sesión
      </button>
    </div>
  );
}
