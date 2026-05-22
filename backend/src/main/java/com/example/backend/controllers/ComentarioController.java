package com.example.backend.controllers;

import com.example.backend.dto.ComentarioDTO;
import com.example.backend.services.ComentarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comentario")
@RequiredArgsConstructor
public class ComentarioController {

    private final ComentarioService comentarioService;

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<ComentarioDTO>> getByProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(comentarioService.getComentariosPorProyecto(proyectoId));
    }


    @PostMapping
    public ResponseEntity<ComentarioDTO> crear(@RequestBody Map<String, Object> body) {
        Long   proyectoId = Long.valueOf(body.get("proyectoId").toString());
        Long   usuarioId  = Long.valueOf(body.get("usuarioId").toString());
        String texto      = body.get("texto").toString();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(comentarioService.crear(proyectoId, usuarioId, texto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Long usuarioId = Long.valueOf(body.get("usuarioId").toString());
        comentarioService.eliminar(id, usuarioId);
        return ResponseEntity.noContent().build();
    }
}