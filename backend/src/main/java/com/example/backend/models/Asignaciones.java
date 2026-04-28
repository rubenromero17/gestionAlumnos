package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "asignaciones")
public class Asignaciones {

    @EmbeddedId
    private Long id;

    @ManyToOne
    @MapsId("alumnoId")
    @JoinColumn(name = "alumno_id")
    private Alumnos alumno;

    @ManyToOne
    @MapsId("proyectoId")
    @JoinColumn(name = "proyecto_id")
    private Proyectos proyecto;
}