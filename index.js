const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('./db');

const app = express();
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Usuario y contraseña de al menos 8 caracteres son requeridos.'
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, passwordHash],
      (error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'No fue posible registrar el usuario.'
          });
        }

        return res.status(201).json({
          success: true,
          message: 'Usuario registrado con éxito.'
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error procesando el registro.'
    });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Usuario y contraseña son requeridos.'
    });
  }

  connection.query(
    'SELECT id, username, password FROM users WHERE username = ? LIMIT 1',
    [username],
    async (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales incorrectas.'
        });
      }

      const passwordMatches = await bcrypt.compare(password, results[0].password);
      if (!passwordMatches) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales incorrectas.'
        });
      }

      return res.json({
        success: true,
        message: 'Inicio de sesión exitoso.'
      });
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
