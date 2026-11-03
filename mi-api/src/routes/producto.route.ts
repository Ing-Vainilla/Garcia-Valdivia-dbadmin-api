import { Router } from "express";
import { getProducto, getProducts, createProducto } from "../controllers/producto.controller";

const router = Router();

router.get('/producto/:id', getProducto);
router.get('/productos', getProducts);
router.post('/producto', createProducto);

export default router;