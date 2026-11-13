-- --------------------------------------------------------
-- PROCEDURE 1: Reporte Mensual de Cliente
-- Parámetros: p_cliente_id, p_mes, p_anio
-- Retorna: facturación total, envíos entregados y tiempo promedio de entrega (horas)
-- --------------------------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS sp_reporte_mensual_cliente //

CREATE PROCEDURE sp_reporte_mensual_cliente(
    IN p_cliente_id INT,
    IN p_mes INT,
    IN p_anio INT
)
BEGIN
    SELECT 
        c.id AS cliente_id,
        c.nombre AS cliente,
        p_mes AS mes,
        p_anio AS anio,
        COUNT(e.id) AS total_envios_mes,
        COALESCE(SUM(CASE WHEN e.estado = 'ENTREGADO' THEN 1 ELSE 0 END), 0) AS envios_entregados,
        COALESCE(SUM(e.costo_total), 0.00) AS facturacion_total,
        COALESCE(ROUND(AVG(CASE 
            WHEN e.estado = 'ENTREGADO' AND e.fecha_entrega IS NOT NULL 
            THEN TIMESTAMPDIFF(HOUR, e.fecha, e.fecha_entrega) 
            ELSE NULL 
        END), 2), 0.00) AS tiempo_promedio_entrega_horas
    FROM clientes c
    LEFT JOIN envios e ON c.id = e.cliente_id 
        AND MONTH(e.fecha) = p_mes 
        AND YEAR(e.fecha) = p_anio
    WHERE c.id = p_cliente_id
    GROUP BY c.id, c.nombre;
END //

DELIMITER ;


-- --------------------------------------------------------
-- PROCEDURE 2: Hoja de Ruta e Historial
-- Parámetros: p_envio_id
-- Retorna: 
--   1. Datos del envío, remitente, destinatario y direcciones
--   2. Desglose de paquetes del envío
--   3. Historial cronológico de rastreo
-- --------------------------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS sp_obtener_hoja_ruta_envio //

CREATE PROCEDURE sp_obtener_hoja_ruta_envio(
    IN p_envio_id INT
)
BEGIN
    SELECT 
        e.id AS envio_id,
        e.fecha AS fecha_envio,
        e.estado AS estado_actual,
        e.costo_total,
        c.id AS remitente_id,
        c.nombre AS remitente_nombre,
        c.email AS remitente_email,
        c.telefono AS remitente_telefono,
        CONCAT(d_orig.calle, ' #', d_orig.numero, ', ', d_orig.ciudad, ', ', d_orig.estado, ' C.P. ', d_orig.codigo_postal) AS direccion_origen,
        e.destinatario AS destinatario_nombre,
        CONCAT(d_dest.calle, ' #', d_dest.numero, ', ', d_dest.ciudad, ', ', d_dest.estado, ' C.P. ', d_dest.codigo_postal) AS direccion_destino
    FROM envios e
    INNER JOIN clientes c ON e.cliente_id = c.id
    INNER JOIN direcciones d_orig ON e.direccion_origen_id = d_orig.id
    INNER JOIN direcciones d_dest ON e.direccion_destino_id = d_dest.id
    WHERE e.id = p_envio_id;

    SELECT 
        p.id AS paquete_id,
        p.contenido,
        p.peso AS peso_kg,
        p.dimensiones,
        COALESCE(a.nombre, 'Sin almacén asignado') AS almacen_actual,
        COALESCE(a.ubicacion, 'N/A') AS ubicacion_almacen
    FROM paquetes p
    LEFT JOIN almacenes a ON p.almacen_id = a.id
    WHERE p.envio_id = p_envio_id;

    SELECT 
        h.id AS rastreo_id,
        h.fecha,
        h.ubicacion_actual,
        h.estado_evento,
        h.observaciones
    FROM historial_rastreo h
    WHERE h.envio_id = p_envio_id
    ORDER BY h.fecha ASC;
END //

DELIMITER ;
