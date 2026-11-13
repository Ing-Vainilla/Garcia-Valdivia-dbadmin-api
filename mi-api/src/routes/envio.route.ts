import { Router } from "express";
import {
    createEnvio,
    updateCostoEnvio,
    addRastreoEnvio,
    getEnviosActivos
} from "../controllers/envio.controller.js";

const router = Router();

// Endpoint 1: POST /api/envios → Registra un nuevo envío y guarda sus paquetes iniciales
router.post("/envios", createEnvio);

// Endpoint 2: PUT /api/envios/:id/costo → Modifica el costo total (Detona Trigger Auditoría)
router.put("/envios/:id/costo", updateCostoEnvio);

// Endpoint 4: POST /api/envios/:id/rastreo → Agrega rastreo (Detona Trigger de actualización a ENTREGADO)
router.post("/envios/:id/rastreo", addRastreoEnvio);

// Endpoint 5: GET /api/envios → Consulta de envíos activos con TypeORM QueryBuilder
router.get("/envios", getEnviosActivos);

export default router;
