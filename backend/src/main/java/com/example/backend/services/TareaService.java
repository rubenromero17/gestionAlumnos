package com.example.backend.services;

import com.example.backend.dto.TareaProyectoDTO;
import com.example.backend.exception.ElementoNoEncontradoException;
import com.example.backend.models.*;
import com.example.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TareaService {

    private final TareaProyectoRepository   tareaRepo;
    private final TareaCompletadaRepository completadaRepo;
    private final ProyectoRepository        proyectoRepo;
    private final AlumnoRepository          alumnoRepo;


    public List<TareaProyectoDTO> getTareasPorProyecto(Long proyectoId) {
        return tareaRepo.findByProyectoIdOrderByOrdenAsc(proyectoId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<TareaProyectoDTO> guardarTareas(Long proyectoId, List<String> titulos) {
        Proyecto proyecto = proyectoRepo.findById(proyectoId)
                .orElseThrow(() -> new ElementoNoEncontradoException("Proyecto no encontrado: " + proyectoId));

        tareaRepo.deleteByProyectoId(proyectoId);
        tareaRepo.flush();

        List<TareaProyecto> nuevas = new java.util.ArrayList<>();
        for (int i = 0; i < titulos.size(); i++) {
            String t = titulos.get(i).trim();
            if (t.isEmpty()) continue;
            TareaProyecto tp = new TareaProyecto();
            tp.setProyecto(proyecto);
            tp.setTitulo(t);
            tp.setOrden(i);
            nuevas.add(tareaRepo.save(tp));
        }
        return nuevas.stream().map(this::toDTO).collect(Collectors.toList());
    }



    public List<TareaProyectoDTO> getTareasConEstado(Long proyectoId, Long usuarioId) {
        Alumno alumno = alumnoRepo.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ElementoNoEncontradoException(
                        "Alumno no encontrado para el usuario: " + usuarioId));

        List<TareaProyecto> tareas = tareaRepo.findByProyectoIdOrderByOrdenAsc(proyectoId);

        Set<Long> completadas = completadaRepo.findByAlumnoId(alumno.getId())
                .stream()
                .filter(TareaCompletada::getCompletada)
                .map(tc -> tc.getTarea().getId())
                .collect(Collectors.toSet());

        return tareas.stream()
                .map(t -> {
                    TareaProyectoDTO dto = toDTO(t);
                    dto.setCompletada(completadas.contains(t.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Transactional
    public void toggleTarea(Long tareaId, Long usuarioId, boolean completada) {
        Alumno alumno = alumnoRepo.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ElementoNoEncontradoException(
                        "Alumno no encontrado para el usuario: " + usuarioId));

        TareaProyecto tarea = tareaRepo.findById(tareaId)
                .orElseThrow(() -> new ElementoNoEncontradoException("Tarea no encontrada: " + tareaId));

        TareaCompletada tc = completadaRepo
                .findByTareaIdAndAlumnoId(tareaId, alumno.getId())
                .orElseGet(() -> {
                    TareaCompletada nuevo = new TareaCompletada();
                    nuevo.setTarea(tarea);
                    nuevo.setAlumno(alumno);
                    return nuevo;
                });

        tc.setCompletada(completada);
        completadaRepo.save(tc);
    }

    private TareaProyectoDTO toDTO(TareaProyecto t) {
        return new TareaProyectoDTO(
                t.getId(),
                t.getProyecto().getId(),
                t.getTitulo(),
                t.getOrden(),
                null
        );
    }
}