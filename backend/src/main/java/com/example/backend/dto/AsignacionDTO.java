package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionDTO {

    private Integer alumnoId;
    private Integer proyectoId;

    private String nombreAlumno;
    private String tituloProyecto;
}
