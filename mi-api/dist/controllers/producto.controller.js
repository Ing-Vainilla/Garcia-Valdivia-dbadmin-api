"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.getProducto = exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getProductos = void 0;
const ProductoRepository_js_1 = require("../repository/ProductoRepository.js");
// GETALL: Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const productos = await ProductoRepository_js_1.productoRepository.findAll();
        return res.status(200).json({
            status: 200,
            message: "Productos obtenidos exitosamente",
            data: productos,
        });
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener los productos",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getProductos = getProductos;
// GETBYID: Obtener un producto por su ID
const getProductoById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }
        const producto = await ProductoRepository_js_1.productoRepository.findById(id);
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
    }
    catch (error) {
        console.error("Error al obtener producto por ID:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getProductoById = getProductoById;
// POST: Crear un nuevo producto
const createProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body;
        if (!nombre || precio === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Los campos 'nombre' y 'precio' son obligatorios",
            });
        }
        const nuevoProducto = await ProductoRepository_js_1.productoRepository.create({
            nombre,
            precio: Number(precio),
            stock: stock !== undefined ? Number(stock) : 0,
            categoriaId: categoriaId !== undefined && categoriaId !== null ? Number(categoriaId) : undefined,
        });
        // Cargar producto completo con relaciones
        const productoCargado = await ProductoRepository_js_1.productoRepository.findById(nuevoProducto.productoId);
        return res.status(201).json({
            status: 201,
            message: "Producto creado exitosamente",
            data: productoCargado || nuevoProducto,
        });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al crear el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.createProducto = createProducto;
// PUT: Actualizar un producto existente por su ID
const updateProducto = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }
        const existing = await ProductoRepository_js_1.productoRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Producto con ID ${id} no encontrado`,
                data: null,
            });
        }
        const { nombre, precio, stock, categoriaId } = req.body;
        const updateData = {};
        if (nombre !== undefined)
            updateData.nombre = nombre;
        if (precio !== undefined)
            updateData.precio = Number(precio);
        if (stock !== undefined)
            updateData.stock = Number(stock);
        if (categoriaId !== undefined)
            updateData.categoriaId = Number(categoriaId);
        const productoActualizado = await ProductoRepository_js_1.productoRepository.update(id, updateData);
        return res.status(200).json({
            status: 200,
            message: "Producto actualizado exitosamente",
            data: productoActualizado,
        });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al actualizar el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.updateProducto = updateProducto;
// DELETE: Eliminar un producto por su ID
const deleteProducto = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del producto debe ser un número válido",
            });
        }
        const existing = await ProductoRepository_js_1.productoRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Producto con ID ${id} no encontrado`,
                data: null,
            });
        }
        await ProductoRepository_js_1.productoRepository.delete(id);
        return res.status(200).json({
            status: 200,
            message: `Producto con ID ${id} eliminado exitosamente`,
        });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al eliminar el producto",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.deleteProducto = deleteProducto;
// Alias para compatibilidad previa
exports.getProducto = exports.getProductoById;
exports.getProducts = exports.getProductos;
