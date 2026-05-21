package com.example.backend.controllers;

import com.example.backend.dto.TareaProyectoDTO;
import com.example.backend.services.TareaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tarea")
@RequiredArgsConstructor
public class TareaController {

    private final TareaService tareaService;

    // ── ADMIN ─────────────────────────────────────────────────────────────────

    /** GET /api/tarea/proyecto/{proyectoId}  → lista de tareas sin estado alumno */
    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<TareaProyectoDTO>> getTareas(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(tareaService.getTareasPorProyecto(proyectoId));
    }

    /**
     * PUT /api/tarea/proyecto/{proyectoId}
     * Body: { "titulos": ["Tarea 1", "Tarea 2", ...] }
     * Reemplaza toda la lista de tareas del proyecto.
     */
    @PutMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<TareaProyectoDTO>> guardarTareas(
            @PathVariable Long proyectoId,
            @RequestBody Map<String, List<String>> body) {
        List<String> titulos = body.get("titulos");
        return ResponseEntity.ok(tareaService.guardarTareas(proyectoId, titulos));
    }

    // ── ALUMNO ────────────────────────────────────────────────────────────────

    /**
     * GET /api/tarea/proyecto/{proyectoId}/usuario/{usuarioId}
     * Devuelve las tareas con el campo `completada` según el alumno.
     */
    @GetMapping("/proyecto/{proyectoId}/usuario/{usuarioId}")
    public ResponseEntity<List<TareaProyectoDTO>> getTareasConEstado(
            @PathVariable Long proyectoId,
            @PathVariable Long usuarioId) {
        return ResponseEntity.ok(tareaService.getTareasConEstado(proyectoId, usuarioId));
    }

    /**
     * PATCH /api/tarea/{tareaId}/usuario/{usuarioId}
     * Body: { "completada": true | false }
     */
    @PatchMapping("/{tareaId}/usuario/{usuarioId}")
    public ResponseEntity<Void> toggleTarea(
            @PathVariable Long tareaId,
            @PathVariable Long usuarioId,
            @RequestBody Map<String, Boolean> body) {
        tareaService.toggleTarea(tareaId, usuarioId, body.get("completada"));
        return ResponseEntity.noContent().build();
    }
}