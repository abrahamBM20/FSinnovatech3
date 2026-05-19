const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de microservicios
const SERVICES = {
  usuarios: 'http://localhost:8080',
  proyectos: 'http://localhost:8081',
  analytics: 'http://localhost:8000'
};

// Logging de requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ========== HEALTH ==========
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'API Gateway',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// ========== AUTH (Usuarios Service) ==========
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.usuarios}/api/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error en login'
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.usuarios}/api/auth/register`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error en registro'
    });
  }
});

app.put('/api/auth/profile/:id', async (req, res) => {
  try {
    const response = await axios.put(`${SERVICES.usuarios}/api/auth/profile/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error al actualizar perfil'
    });
  }
});

// ========== PROYECTOS (Proyectos Service) ==========
app.get('/api/proyectos', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.proyectos}/api/proyectos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

app.post('/api/proyectos', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.proyectos}/api/proyectos`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response?.data?.message || 'Error al crear proyecto' });
  }
});

app.get('/api/proyectos/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.proyectos}/api/proyectos/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Proyecto no encontrado' });
  }
});

app.put('/api/proyectos/:id/avance', async (req, res) => {
  try {
    const { porcentaje } = req.body;
    const response = await axios.put(`${SERVICES.proyectos}/api/proyectos/${req.params.id}/avance`, null, {
      params: { porcentaje }
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar avance' });
  }
});

app.delete('/api/proyectos/:id', async (req, res) => {
  try {
    await axios.delete(`${SERVICES.proyectos}/api/proyectos/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Proyecto no encontrado' });
  }
});

// ========== TAREAS ==========
app.post('/api/tareas', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.proyectos}/api/proyectos/tareas`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response?.data?.message || 'Error al crear tarea' });
  }
});

app.get('/api/proyectos/:proyectoId/tareas', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.proyectos}/api/proyectos/${req.params.proyectoId}/tareas`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

app.put('/api/tareas/:tareaId/estado', async (req, res) => {
  try {
    const { estado } = req.body;
    const response = await axios.put(`${SERVICES.proyectos}/api/proyectos/tareas/${req.params.tareaId}/estado`, null, {
      params: { estado }
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar estado' });
  }
});

// ========== ANALYTICS (Analytics Service) ==========
app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.analytics}/api/analytics/dashboard`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener dashboard' });
  }
});

app.get('/api/analytics/kpis', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.analytics}/api/analytics/kpis`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener KPIs' });
  }
});

app.get('/api/analytics/proyectos/avance', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.analytics}/api/analytics/proyectos/avance`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener avance de proyectos' });
  }
});

app.get('/api/analytics/recursos/carga', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.analytics}/api/analytics/recursos/carga`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carga de recursos' });
  }
});

// ========== INICIAR SERVIDOR ==========
app.listen(PORT, () => {
  console.log('\n✅ API Gateway corriendo en http://localhost:' + PORT);
  console.log('\n📋 Endpoints disponibles:');
  console.log('   GET  /health');
  console.log('   POST /api/auth/login');
  console.log('   POST /api/auth/register');
  console.log('   GET  /api/proyectos');
  console.log('   POST /api/proyectos');
  console.log('   GET  /api/proyectos/:id');
  console.log('   PUT  /api/proyectos/:id/avance');
  console.log('   POST /api/tareas');
  console.log('   GET  /api/proyectos/:proyectoId/tareas');
  console.log('   PUT  /api/tareas/:tareaId/estado');
  console.log('   GET  /api/analytics/dashboard');
  console.log('   GET  /api/analytics/kpis');
  console.log('   GET  /api/analytics/proyectos/avance');
  console.log('   GET  /api/analytics/recursos/carga\n');
});