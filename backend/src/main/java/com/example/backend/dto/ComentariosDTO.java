package com.example.backend.dto;

import com.example.backend.models.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ComentariosDTO {

    private Long id;

    private Proyectos proyecto;

    private Usuarios usuario;

    private String texto;

    private LocalDateTime fecha = LocalDateTime.now();
}
