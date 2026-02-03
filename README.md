# Mi Doctor en Línea

Sistema hospitalario simplificado desarrollado como prueba técnica para prácticas profesionales.
El proyecto simula una parte básica de un sistema clínico, permitiendo la autenticación de usuarios
y la gestión de pacientes mediante un flujo completo frontend–backend.

El objetivo principal es demostrar el manejo de autenticación con JWT, protección de rutas,
consumo de APIs y operaciones CRUD utilizando un stack moderno.

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- MySQL
- JWT

### Frontend
- Next.js
- TypeScript

## Funcionalidades

### Autenticación
- Registro de usuarios
- Login con JWT
- Protección de rutas privadas

### Gestión de Pacientes
- Crear paciente
- Listar pacientes
- Editar paciente
- Eliminar paciente

## Configuración Backend
bash
cd backend
npm install

- Variables de Entorno
Crear un archivo .env en /backend:
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mi_doctor_db
JWT_SECRET=super_secret_key

- Ejecutar el backend
npm run dev

- El backen correrá en:
http://localhost:3001

## Configuración Frontend
- Instalar dependencias
cd frontend
npm install

- Ejecutar frontend
npm run dev

- El frontend correrá en:
http://localhost:3000

## Base de Datos

El proyecto utiliza MySQL.

### Importar la base de datos
1. Abrir XAMPP e iniciar Apache y MySQL
2. Ir a http://localhost/phpmyadmin
3. Crear una base de datos llamada:
   mi_doctor_en_linea
4. Importar el archivo:
   database/mi_doctor_db.sql

Usuario: root  
Contraseña: (vacía)



## Usuario de Prueba
Para facilitar la evaluación del sistema, se incluye un usuario de prueba en la base de datos:

- Email: isaac@test.com  
- Password: 123456

## Cómo probar el sistema

1. Levantar MySQL y Apache en XAMPP
2. Importar la base de datos
3. Ejecutar el backend
4. Ejecutar el frontend
5. Ingresar en:
   http://localhost:3000/login
6. Usar el usuario de prueba para iniciar sesión

## Notas Finales
- El sistema utiliza JWT para autenticación.
- Las rutas del dashboard están protegidas.
- El diseño es simple y funcional, enfocado en claridad y flujo.
- El archivo `.env` no se incluye en el repositorio por seguridad.