import express from 'express';
import cors from 'cors';

import respuestaRoutes from './routes/respuestas.routes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import formularioRespondidoRoutes from './routes/formularioRespondido.routes.js';
import estudianteRoutes from './routes/estudiantes.routes.js';
import organizacionRoutes from './routes/organizacion.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import testRoutes from './routes/test.routes.js';
import authRoutes from './routes/auth.routes.js';



const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/organizaciones', organizacionRoutes);
app.use('/api/test', testRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/formularios-respondidos', formularioRespondidoRoutes);
app.use('/api/respuestas', respuestaRoutes);
app.use('/api/auth', authRoutes);

export default app;
