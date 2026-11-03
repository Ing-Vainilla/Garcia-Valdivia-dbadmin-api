import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository";

export const getProducto = async (req: Request, res: Response) => {

    const producto = await productoRepository.findById(1);

    return res.json({ 
        message: "Producto encontrado",
        status: 200,
        data: producto,
    });
}

export const getProducts = async (req: Request, res: Response) => {

    const productos = await productoRepository.findAll();

    return res.json({ 
        message: "Productos encontrados",
        status: 200,
        data: productos
    });
}

export const createProducto = async (req: Request, res: Response) => {
    const { nombre, precio, stock, categoriaId } = req.body;

    const producto = await productoRepository.create({ nombre, precio, stock, categoriaId });

    return res.json({
        message: "Producto creado",
        status: 201,
        data: producto,
    })
}