// index.js (o el archivo que uses para manejar la lógica del backend)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./db'); // Archivo de conexión a la base de datos

app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes JSON

// Endpoint de registro
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    // Lógica para insertar el usuario en la base de datos
    // Aquí deberías realizar las validaciones necesarias y usar hashing para la contraseña

    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
        }
        res.json({ success: true, message: 'Usuario registrado con éxito.' });
    });
});

// Endpoint de inicio de sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Lógica para validar el usuario y la contraseña
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
        }
        res.json({ success: true, message: 'Inicio de sesión exitoso.' });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
