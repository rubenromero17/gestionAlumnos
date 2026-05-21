package com.example.backend.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class TareaProyectoDTO {
    private Long    id;
    private Long    proyectoId;
    private String  titulo;
    private Integer orden;
    /** Solo se rellena cuando el alumno consulta sus tareas */
    private Boolean completada;
}