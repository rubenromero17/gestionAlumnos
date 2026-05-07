package com.example.backend.services;

import com.example.backend.dto.ComentariosDTO;
import com.example.backend.mapper.ComentariosMapper;
import com.example.backend.models.Comentarios;
import com.example.backend.repositories.ComentarioRepository;
import com.example.backend.repositories.ProyectoRepository; // Asumiendo que existen
import com.example.backend.repositories.UsuarioRepository;
import com.example.backend.exception.ElementoNoEncontradoException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private ComentariosMapper comentarioMapper;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public ComentariosDTO crearComentario(ComentariosDTO dto) {
        Comentarios comentario = comentarioMapper.toEntity(dto);

        comentario.setProyecto(proyectoRepository.findById(dto.getProyectoId())
                .orElseThrow(() -> new ElementoNoEncontradoException("Proyecto no encontrado")));
        comentario.setUsuario(usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ElementoNoEncontradoException("Usuario no encontrado")));

        return comentarioMapper.toDTO(comentarioRepository.save(comentario));
    }

    public List<ComentariosDTO> obtenerTodos() {
        return comentarioMapper.toDTO(comentarioRepository.findAll());
    }

    public ComentariosDTO obtenerPorId(Long id) {
        Comentarios comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ElementoNoEncontradoException("Comentario no encontrado"));
        return comentarioMapper.toDTO(comentario);
    }

    public void eliminarComentario(Long id) {
        if (!comentarioRepository.existsById(id)) {
            throw new ElementoNoEncontradoException("No se puede eliminar: ID no existe");
        }
        comentarioRepository.deleteById(id);
    }
}