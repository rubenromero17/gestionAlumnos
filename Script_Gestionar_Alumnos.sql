-- =========================================
-- CONFIGURACIÓN INICIAL
-- =========================================
SET FOREIGN_KEY_CHECKS = 0;

-- =========================================
-- 1. TABLA USUARIOS
-- =========================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    nombre_real VARCHAR(100) NOT NULL,
    CONSTRAINT chk_rol CHECK (rol IN ('alumno', 'administrador'))
);

-- =========================================
-- 2. TABLA MODALIDADES
-- =========================================
CREATE TABLE modalidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- =========================================
-- 3. TABLA ALUMNOS
-- =========================================
CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNIQUE,
    modalidad_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (modalidad_id) REFERENCES modalidades(id)
);

-- =========================================
-- 4. TABLA PROYECTOS
-- =========================================
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    cupo_maximo INT NOT NULL DEFAULT 5,
    estado VARCHAR(20) NOT NULL DEFAULT 'en_curso',
    CONSTRAINT chk_estado CHECK (estado IN ('en_curso', 'finalizado', 'pausado'))
);

-- =========================================
-- 5. TABLA ASIGNACIONES
-- =========================================
CREATE TABLE asignaciones (
    alumno_id INT,
    proyecto_id INT,
    PRIMARY KEY (alumno_id, proyecto_id),
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- =========================================
-- 6. TRIGGER CUPOS PROYECTOS
-- =========================================
DELIMITER $$

CREATE TRIGGER evitar_exceso_cupo
BEFORE INSERT ON asignaciones
FOR EACH ROW
BEGIN
    DECLARE v_total INT;
    DECLARE v_cupo  INT;

    SELECT COUNT(*) INTO v_total
    FROM asignaciones
    WHERE proyecto_id = NEW.proyecto_id;

    SELECT cupo_maximo INTO v_cupo
    FROM proyectos
    WHERE id = NEW.proyecto_id;

    IF v_total >= v_cupo THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: El proyecto ha alcanzado su límite de alumnos';
    END IF;
END$$

DELIMITER ;

-- =========================================
-- 7. TABLA COMENTARIOS
-- =========================================
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    usuario_id INT,
    texto VARCHAR(500) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- =========================================
-- 8. TABLA HORARIOS
-- =========================================
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio VARCHAR(10) NOT NULL,
    hora_fin VARCHAR(10) NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

-- =========================================
-- 9. TABLA ASISTENCIA
-- =========================================
CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT,
    fecha DATE DEFAULT (CURRENT_DATE),
    presente TINYINT(1) DEFAULT 0,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

-- =========================================
-- RESTAURAR CONFIGURACIÓN
-- =========================================
SET FOREIGN_KEY_CHECKS = 1;