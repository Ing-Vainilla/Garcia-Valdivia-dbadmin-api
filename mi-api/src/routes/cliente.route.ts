import { Router } from "express";
import { getEnviosPorCliente } from "../controllers/cliente.controller.js";

const router = Router();

// Endpoint 6: GET /api/clientes/:id/envios → Historial de envíos vinculados a un cliente específico
router.get("/clientes/:id/envios", getEnviosPorCliente);

export default router;
