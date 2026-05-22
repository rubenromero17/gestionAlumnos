package com.example.backend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor
public class ComentarioDTO {
    private Long          id;
    private Long          proyectoId;
    private Long          usuarioId;
    private String        nombreUsuario;
    private String        fotoUsuario;
    private String        texto;
    private LocalDateTime fecha;
}