const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const actividadesRoutes = require('./routes/actividadesRoutes');

const app = express();
const PORT = 3000;

// Conectar con la base de datos MongoDB
mongoose
  .connect('mongodb://localhost:27017/fluentaprendizaje', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch(error => console.error('Error al conectar con MongoDB:', error));

// Middleware para analizar JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de actividades (API)
app.use('/api/actividades', actividadesRoutes);

// Ruta base para la aplicación web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'actividades.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
