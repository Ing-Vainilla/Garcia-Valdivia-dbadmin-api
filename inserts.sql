-- 1. INSERTS: clientes
INSERT INTO clientes (id, nombre, email, telefono, estado, limite_credito, created_at) VALUES
(1, 'Carlos Mendoza', 'carlos.mendoza@email.com', '555-1234567', 'ACTIVO', 15000.00, '2026-10-01 08:00:00'),
(2, 'Ana Gómez', 'ana.gomez@email.com', '555-9876543', 'ACTIVO', 8000.00, '2026-10-05 09:30:00'),
(3, 'Roberto Morales', 'roberto.m@email.com', '555-4567890', 'ACTIVO', 5000.00, '2026-10-10 11:00:00'),
(4, 'Lucía Fernández', 'lucia.f@email.com', '555-1122334', 'INACTIVO', 0.00, '2026-10-15 14:20:00')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- 2. INSERTS: direcciones
INSERT INTO direcciones (id, cliente_id, calle, numero, ciudad, estado, codigo_postal, tipo, created_at) VALUES
(1, 1, 'Av. Insurgentes Sur', '1200', 'Ciudad de México', 'CDMX', '03900', 'ORIGEN', '2026-10-01 08:15:00'),
(2, 1, 'Paseo de la Reforma', '450', 'Ciudad de México', 'CDMX', '06600', 'DESTINO', '2026-10-01 08:20:00'),
(3, 2, 'Av. Vallarta', '2345', 'Guadalajara', 'Jalisco', '44100', 'ORIGEN', '2026-10-05 09:40:00'),
(4, 2, 'Av. Juárez', '890', 'Zapopan', 'Jalisco', '45100', 'DESTINO', '2026-10-05 09:45:00'),
(5, 3, 'Av. Constitución', '100', 'Monterrey', 'Nuevo León', '64000', 'ORIGEN', '2026-10-10 11:10:00'),
(6, 3, 'Av. Benito Juárez', '55', 'San Pedro Garza García', 'Nuevo León', '66220', 'DESTINO', '2026-10-10 11:15:00')
ON DUPLICATE KEY UPDATE calle = VALUES(calle);

-- 3. INSERTS: almacenes
-- NOTA: El almacén 2 tiene capacidad_maxima = 2 para probar el Trigger de sobrecupo (Error 45000).
INSERT INTO almacenes (id, nombre, ubicacion, capacidad_maxima) VALUES
(1, 'Almacén Central CDMX', 'Vallejo 100, Azcapotzalco, CDMX', 50),
(2, 'Almacén Express Norte', 'Parque Industrial Milimex, Apodaca, NL', 2),
(3, 'Almacén Occidente GDL', 'El Salto, Carretera Chapala km 18, Jalisco', 30)
ON DUPLICATE KEY UPDATE capacidad_maxima = VALUES(capacidad_maxima);

-- 4. INSERTS: envios
-- Datos preparados para probar facturación mensual y tiempos promedio del procedure
INSERT INTO envios (id, cliente_id, destinatario, direccion_origen_id, direccion_destino_id, costo_total, fecha, fecha_entrega, estado) VALUES
(1, 1, 'Empresa XYZ S.A.', 1, 2, 450.00, '2026-11-01 09:00:00', '2026-11-03 15:00:00', 'ENTREGADO'),
(2, 1, 'Pedro Ramírez', 1, 2, 320.50, '2026-11-04 10:00:00', '2026-11-05 16:00:00', 'ENTREGADO'),
(3, 1, 'Tecnologías del Bajío', 1, 2, 600.00, '2026-11-10 11:00:00', NULL, 'EN_TRANSITO'),
(4, 2, 'Sofía Navarro', 3, 4, 250.00, '2026-11-11 14:00:00', NULL, 'REGISTRADO')
ON DUPLICATE KEY UPDATE costo_total = VALUES(costo_total);

-- 5. INSERTS: paquetes
-- Nota: Almacén 2 ya tiene 2 paquetes asignados (alcanza su capacidad_maxima = 2)
INSERT INTO paquetes (id, envio_id, almacen_id, peso, dimensiones, contenido) VALUES
(1, 1, 1, 2.50, '30x20x15 cm', 'Documentos legales y contratos'),
(2, 1, 1, 5.00, '40x30x20 cm', 'Muestras de telas industriales'),
(3, 2, 1, 1.20, '20x15x10 cm', 'Componentes electrónicos'),
(4, 3, 2, 8.50, '50x40x30 cm', 'Equipo de cómputo y servidores'),
(5, 4, 2, 3.00, '25x25x20 cm', 'Refacciones mecánicas')
ON DUPLICATE KEY UPDATE contenido = VALUES(contenido);

-- 6. INSERTS: historial_rastreo
-- Registro cronológico para probar la Hoja de Ruta del Procedure 2
INSERT INTO historial_rastreo (id, envio_id, fecha, ubicacion_actual, estado_evento, observaciones) VALUES
(1, 1, '2026-11-01 09:15:00', 'Sucursal Insurgentes, CDMX', 'REGISTRADO', 'Envío recibido en sucursal origen'),
(2, 1, '2026-11-02 08:30:00', 'Almacén Central CDMX', 'EN_TRANSITO', 'Paquetes clasificados y despachados a ruta local'),
(3, 1, '2026-11-03 15:00:00', 'Paseo de la Reforma 450, CDMX', 'ENTREGADO', 'Recibido y firmado por guardia de recepción'),
(4, 2, '2026-11-04 10:30:00', 'Sucursal Insurgentes, CDMX', 'REGISTRADO', 'Recepción de paquete'),
(5, 2, '2026-11-05 16:00:00', 'Paseo de la Reforma 450, CDMX', 'ENTREGADO', 'Entregado al destinatario final'),
(6, 3, '2026-11-10 11:30:00', 'Almacén Express Norte, NL', 'EN_TRANSITO', 'En tránsito hacia bodega regional')
ON DUPLICATE KEY UPDATE estado_evento = VALUES(estado_evento);

-- 7. INSERTS: auditoria_envios (registro histórico de ejemplo)
INSERT INTO auditoria_envios (id, envio_id, costo_anterior, costo_nuevo, usuario, fecha_modificacion) VALUES
(1, 1, 400.00, 450.00, 'admin@logiexpress.com', '2026-11-01 08:45:00')
ON DUPLICATE KEY UPDATE usuario = VALUES(usuario);
