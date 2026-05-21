package com.example.backend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor
public class ComentarioDTO {
    private Long          id;
    private Long          proyectoId;
    private Long          usuarioId;
    private String        nombreUsuario;   // nombreReal para mostrar en el chat
    private String        fotoUsuario;     // avatar base64 o null
    private String        texto;
    private LocalDateTime fecha;
}