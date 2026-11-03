import { Request, Response } from "express";
import { productoRepository } from "../repository/ProductoRepository.js";

// GETALL: Obtener todos los productos
export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await productoRepository.findAll();

        return res.status(200).json({
            status: 200,
            message: "Productos obtenidos exitosamente",
            data: productos,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener los productos",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// GETBYID: Obtener un producto por su ID
export const getProductoById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }

        const producto = await productoRepository.findById(id);

        if (!producto) {
            return res.status(404).json({
                status: 404,
                message: `Producto con ID ${id} no encontrado`,
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Producto encontrado",
            data: producto,
        });
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// POST: Crear un nuevo producto
export const createProducto = async (req: Request, res: Response) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body;

        if (!nombre || precio === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Los campos 'nombre' y 'precio' son obligatorios",
            });
        }

        const nuevoProducto = await productoRepository.create({
            nombre,
            precio: Number(precio),
            stock: stock !== undefined ? Number(stock) : 0,
            categoriaId: categoriaId !== undefined && categoriaId !== null ? Number(categoriaId) : undefined,
        });

        // Cargar producto completo con relaciones
        const productoCargado = await productoRepository.findById(nuevoProducto.productoId);

        return res.status(201).json({
            status: 201,
            message: "Producto creado exitosamente",
            data: productoCargado || nuevoProducto,
        });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al crear el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// PUT: Actualizar un producto existente por su ID
export const updateProducto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }

        const existing = await productoRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Producto con ID ${id} no encontrado`,
                data: null,
            });
        }

        const { nombre, precio, stock, categoriaId } = req.body;
        const updateData: Partial<typeof existing> = {};

        if (nombre !== undefined) updateData.nombre = nombre;
        if (precio !== undefined) updateData.precio = Number(precio);
        if (stock !== undefined) updateData.stock = Number(stock);
        if (categoriaId !== undefined) updateData.categoriaId = Number(categoriaId);

        const productoActualizado = await productoRepository.update(id, updateData);

        return res.status(200).json({
            status: 200,
            message: "Producto actualizado exitosamente",
            data: productoActualizado,
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al actualizar el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// DELETE: Eliminar un producto por su ID
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }

        const existing = await productoRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Producto con ID ${id} no encontrado`,
                data: null,
            });
        }

        await productoRepository.delete(id);

        return res.status(200).json({
            status: 200,
            message: `Producto con ID ${id} eliminado exitosamente`,
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al eliminar el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Alias para compatibilidad previa
export const getProducto = getProductoById;
export const getProducts = getProductos;
