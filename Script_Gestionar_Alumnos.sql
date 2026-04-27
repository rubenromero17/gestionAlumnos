-- =========================================
-- 1. TABLA USUARIOS
-- =========================================
CREATE TABLE usuarios (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_usuario VARCHAR2(50) NOT NULL UNIQUE,
    contrasena_hash VARCHAR2(255) NOT NULL,
    rol VARCHAR2(20) NOT NULL
        CHECK (rol IN ('alumno', 'administrador')),
    nombre_real VARCHAR2(100) NOT NULL
);

-- =========================================
-- 2. TABLA MODALIDADES
-- =========================================
CREATE TABLE modalidades (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL UNIQUE
);

-- =========================================
-- 3. TABLA ALUMNOS
-- =========================================
CREATE TABLE alumnos (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id NUMBER UNIQUE,
    modalidad_id NUMBER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (modalidad_id) REFERENCES modalidades(id)
);

-- =========================================
-- 4. TABLA PROYECTOS
-- =========================================
CREATE TABLE proyectos (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR2(100) NOT NULL,
    descripcion VARCHAR2(500),
    cupo_maximo NUMBER DEFAULT 5 NOT NULL,
    estado VARCHAR2(20) DEFAULT 'en curso'
        CHECK (estado IN ('en curso', 'finalizado', 'pausado'))
);

-- =========================================
-- 5. TABLA ASIGNACIONES
-- =========================================
CREATE TABLE asignaciones (
    alumno_id NUMBER,
    proyecto_id NUMBER,
    PRIMARY KEY (alumno_id, proyecto_id),
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- =========================================
-- 6. TRIGGER CUPOS PROYECTOS
-- =========================================
CREATE OR REPLACE TRIGGER evitar_exceso_cupo
BEFORE INSERT ON asignaciones
FOR EACH ROW
DECLARE
    v_total NUMBER;
    v_cupo NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_total
    FROM asignaciones
    WHERE proyecto_id = :NEW.proyecto_id;

    SELECT cupo_maximo INTO v_cupo
    FROM proyectos
    WHERE id = :NEW.proyecto_id;

    IF v_total >= v_cupo THEN
        RAISE_APPLICATION_ERROR(-20001,
        'Error: El proyecto ha alcanzado su límite de alumnos');
    END IF;
END;
/
-- IMPORTANTE: la barra "/" es obligatoria en Oracle

-- =========================================
-- 7. TABLA COMENTARIOS
-- =========================================
CREATE TABLE comentarios (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    proyecto_id NUMBER,
    usuario_id NUMBER,
    texto VARCHAR2(500) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- =========================================
-- 8. TABLA HORARIOS
-- =========================================
CREATE TABLE horarios (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alumno_id NUMBER,
    dia_semana VARCHAR2(20) NOT NULL,
    hora_inicio VARCHAR2(10) NOT NULL,
    hora_fin VARCHAR2(10) NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

-- =========================================
-- 9. TABLA ASISTENCIA
-- =========================================
CREATE TABLE asistencia (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alumno_id NUMBER,
    fecha DATE DEFAULT SYSDATE,
    presente NUMBER(1) DEFAULT 0,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);