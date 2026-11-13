import { Router } from "express";
import { addPaqueteToAlmacen } from "../controllers/almacen.controller.js";

const router = Router();

// Endpoint 3: POST /api/almacenes/:id/paquetes → Asigna paquete (Detona Trigger Capacidad, captura error 45000 -> HTTP 400)
router.post("/almacenes/:id/paquetes", addPaqueteToAlmacen);

export default router;
