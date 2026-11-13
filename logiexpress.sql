-- 1. TABLA: clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    estado ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    limite_credito DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. TABLA: direcciones
CREATE TABLE IF NOT EXISTS direcciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    calle VARCHAR(150) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    tipo ENUM('ORIGEN', 'DESTINO') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_direcciones_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. TABLA: almacenes
CREATE TABLE IF NOT EXISTS almacenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    capacidad_maxima INT NOT NULL
) ENGINE=InnoDB;

-- 4. TABLA: envios
CREATE TABLE IF NOT EXISTS envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    destinatario VARCHAR(100) NOT NULL,
    direccion_origen_id INT NOT NULL,
    direccion_destino_id INT NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega DATETIME NULL,
    estado ENUM('REGISTRADO', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO') NOT NULL DEFAULT 'REGISTRADO',
    CONSTRAINT fk_envios_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_envios_dir_origen
        FOREIGN KEY (direccion_origen_id) REFERENCES direcciones(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_envios_dir_destino
        FOREIGN KEY (direccion_destino_id) REFERENCES direcciones(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. TABLA: paquetes
CREATE TABLE IF NOT EXISTS paquetes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    almacen_id INT NULL,
    peso DECIMAL(8, 2) NOT NULL,
    dimensiones VARCHAR(50) NOT NULL,
    contenido VARCHAR(255) NOT NULL,
    CONSTRAINT fk_paquetes_envio
        FOREIGN KEY (envio_id) REFERENCES envios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_paquetes_almacen
        FOREIGN KEY (almacen_id) REFERENCES almacenes(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 6. TABLA: historial_rastreo
CREATE TABLE IF NOT EXISTS historial_rastreo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ubicacion_actual VARCHAR(255) NOT NULL,
    estado_evento VARCHAR(50) NOT NULL,
    observaciones TEXT NULL,
    CONSTRAINT fk_rastreo_envio
        FOREIGN KEY (envio_id) REFERENCES envios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 7. TABLA: auditoria_envios
CREATE TABLE IF NOT EXISTS auditoria_envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    costo_anterior DECIMAL(10, 2) NOT NULL,
    costo_nuevo DECIMAL(10, 2) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    fecha_modificacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auditoria_envio
        FOREIGN KEY (envio_id) REFERENCES envios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
