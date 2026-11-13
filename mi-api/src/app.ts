import express, { Request, Response } from 'express';
import userRoutes from './routes/user.routes.js';
import productoRoutes from './routes/producto.route.js';
import ventaRoutes from './routes/venta.route.js';

// Rutas de LogiExpress
import envioRoutes from './routes/envio.route.js';
import almacenRoutes from './routes/almacen.route.js';
import clienteRoutes from './routes/cliente.route.js';

const app = express();

app.use(express.json());

// Registro de rutas de logi
app.use('/api', envioRoutes);
app.use('/api', almacenRoutes);
app.use('/api', clienteRoutes);

// Registro de rutas previas
app.use('/api', userRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes);

// Ruta de prueba
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API LogiExpress funcionando correctamente' });
});

export default app;
