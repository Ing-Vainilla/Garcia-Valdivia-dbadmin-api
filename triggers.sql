-- --------------------------------------------------------
-- TRIGGER 1: before_insert_paquete_almacen
-- Tabla: paquetes
-- Propósito: Validar que el almacén tenga capacidad disponible antes de registrar el paquete.
-- Si está lleno, cancela la inserción con SIGNAL SQLSTATE '45000'.
-- --------------------------------------------------------
DELIMITER //

DROP TRIGGER IF EXISTS before_insert_paquete_almacen //

CREATE TRIGGER before_insert_paquete_almacen
BEFORE INSERT ON paquetes
FOR EACH ROW
BEGIN
    DECLARE v_paquetes_actuales INT DEFAULT 0;
    DECLARE v_capacidad_maxima INT DEFAULT 0;

    -- Si el paquete se está asignando a un almacén
    IF NEW.almacen_id IS NOT NULL THEN
        -- Obtener la capacidad máxima del almacén
        SELECT capacidad_maxima INTO v_capacidad_maxima
        FROM almacenes
        WHERE id = NEW.almacen_id;

        -- Contar cuántos paquetes ya están almacenados ahí actualmente
        SELECT COUNT(*) INTO v_paquetes_actuales
        FROM paquetes
        WHERE almacen_id = NEW.almacen_id;

        -- Si ya alcanzó o superó su capacidad, cancelar con error 45000
        IF v_paquetes_actuales >= v_capacidad_maxima THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Capacidad máxima del almacén superada: no hay espacio disponible para más paquetes';
        END IF;
    END IF;
END //

DELIMITER ;


-- --------------------------------------------------------
-- TRIGGER 1.1: before_update_paquete_almacen
-- Tabla: paquetes
-- Propósito: Validar que el almacén tenga capacidad disponible antes de reasignar o mover un paquete.
-- Si está lleno, cancela la actualización con SIGNAL SQLSTATE '45000'.
-- --------------------------------------------------------
DELIMITER //

DROP TRIGGER IF EXISTS before_update_paquete_almacen //

CREATE TRIGGER before_update_paquete_almacen
BEFORE UPDATE ON paquetes
FOR EACH ROW
BEGIN
    DECLARE v_paquetes_actuales INT DEFAULT 0;
    DECLARE v_capacidad_maxima INT DEFAULT 0;

    -- Validar si se está asignando a un almacén o cambiando de almacén
    IF NEW.almacen_id IS NOT NULL AND (OLD.almacen_id IS NULL OR OLD.almacen_id <> NEW.almacen_id) THEN
        -- Obtener la capacidad máxima del almacén destino
        SELECT capacidad_maxima INTO v_capacidad_maxima
        FROM almacenes
        WHERE id = NEW.almacen_id;

        -- Contar cuántos paquetes ya están en ese almacén
        SELECT COUNT(*) INTO v_paquetes_actuales
        FROM paquetes
        WHERE almacen_id = NEW.almacen_id;

        -- Si ya alcanzó o superó su capacidad, cancelar con error 45000
        IF v_paquetes_actuales >= v_capacidad_maxima THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Capacidad máxima del almacén superada: no hay espacio disponible para más paquetes';
        END IF;
    END IF;
END //

DELIMITER ;


-- --------------------------------------------------------
-- TRIGGER 2: after_update_envio_costo
-- Tabla: envios
-- Propósito: Auditar modificaciones a costo_total en envios,
-- guardando costo anterior, costo nuevo, usuario y fecha en auditoria_envios.
-- --------------------------------------------------------
DELIMITER //

DROP TRIGGER IF EXISTS after_update_envio_costo //

CREATE TRIGGER after_update_envio_costo
AFTER UPDATE ON envios
FOR EACH ROW
BEGIN
    -- Solo auditar si el costo_total realmente fue modificado
    IF OLD.costo_total <> NEW.costo_total THEN
        INSERT INTO auditoria_envios (
            envio_id,
            costo_anterior,
            costo_nuevo,
            usuario,
            fecha_modificacion
        )
        VALUES (
            NEW.id,
            OLD.costo_total,
            NEW.costo_total,
            USER(),
            NOW()
        );
    END IF;
END //

DELIMITER ;


-- --------------------------------------------------------
-- TRIGGER 3: after_insert_historial_rastreo
-- Tabla: historial_rastreo
-- Propósito: Al recibir un evento con estado 'ENTREGADO',
-- actualiza automáticamente el estado en la tabla envios a 'ENTREGADO'.
-- --------------------------------------------------------
DELIMITER //

DROP TRIGGER IF EXISTS after_insert_historial_rastreo //

CREATE TRIGGER after_insert_historial_rastreo
AFTER INSERT ON historial_rastreo
FOR EACH ROW
BEGIN
    IF UPPER(NEW.estado_evento) = 'ENTREGADO' THEN
        UPDATE envios
        SET 
            estado = 'ENTREGADO',
            fecha_entrega = COALESCE(NEW.fecha, NOW())
        WHERE id = NEW.envio_id;
    END IF;
END //

DELIMITER ;
