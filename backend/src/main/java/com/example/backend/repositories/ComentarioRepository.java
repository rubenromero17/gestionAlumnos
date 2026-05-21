package com.example.backend.repositories;

import com.example.backend.models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByProyectoIdOrderByFechaAsc(Long proyectoId);

    List<Comentario> findByUsuarioId(Long usuarioId);

    void deleteByProyectoId(Long proyectoId);
}