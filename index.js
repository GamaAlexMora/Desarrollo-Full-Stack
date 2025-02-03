// Importar las dependencias necesarias
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// Crear una aplicación Express
const app = express();
const port = 3000;

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,        // localhost
  user: process.env.DB_USER,        // localhost
  password: process.env.DB_PASSWORD, // 1234
  database: process.env.DB_NAME,    // nombre_de_tu_base_de_datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
