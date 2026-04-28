package com.example.backend.dto;

import com.example.backend.models.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProyectosDTO {

    private Long id;

    private String titulo;

    private String descripcion;

    private Integer cupoMaximo;

    private EstadoProyecto estado;
}
