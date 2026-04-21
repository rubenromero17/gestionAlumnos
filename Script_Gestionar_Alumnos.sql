-- 1. Tabla de Usuarios (Autenticación y Roles)
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario TEXT NOT NULL UNIQUE,
    contrasena_hash TEXT NOT NULL, 
    rol TEXT CHECK(rol IN ('alumno', 'administrador')) NOT NULL,
    nombre_real TEXT NOT NULL
);

-- 2. Tabla de Modalidades (DAM, DAW, etc.)
CREATE TABLE modalidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
);

-- 3. Tabla de Alumnos (Relacionada con Usuario)
CREATE TABLE alumnos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER UNIQUE,
    modalidad_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (modalidad_id) REFERENCES modalidades(id)
);

-- 4. Tabla de Proyectos (con límite de cupo)
CREATE TABLE proyectos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    cupo_maximo INTEGER NOT NULL DEFAULT 5,
    estado TEXT CHECK(estado IN ('en curso', 'finalizado', 'pausado')) DEFAULT 'en curso'
);

-- 5. Tabla de Asignaciones (Relación Alumnos-Proyectos)
CREATE TABLE asignaciones (
    alumno_id INTEGER,
    proyecto_id INTEGER,
    PRIMARY KEY (alumno_id, proyecto_id),
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- 6. Trigger para evitar superar el cupo máximo
CREATE TRIGGER evitar_exceso_cupo
BEFORE INSERT ON asignaciones
FOR EACH ROW
WHEN (
    SELECT COUNT(*) FROM asignaciones 
    WHERE proyecto_id = NEW.proyecto_id
) >= (
    SELECT cupo_maximo FROM proyectos 
    WHERE id = NEW.proyecto_id
)
BEGIN
    SELECT RAISE(ABORT, 'Error: El proyecto ha alcanzado su límite de alumnos');
END;

-- 7. Tabla de Comentarios
CREATE TABLE comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id INTEGER,
    usuario_id INTEGER,
    texto TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 8. Tabla de Horarios
CREATE TABLE horarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alumno_id INTEGER,
    dia_semana TEXT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

-- 9. Tabla de Asistencia
CREATE TABLE asistencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alumno_id INTEGER,
    fecha DATE DEFAULT (DATE('now')),
    presente BOOLEAN DEFAULT 0,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);