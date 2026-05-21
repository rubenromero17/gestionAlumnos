package com.example.backend.mapper;

import com.example.backend.dto.ComentarioDTO;
import com.example.backend.models.Comentario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ComentarioMapper {

    @Mapping(source = "proyecto.id",        target = "proyectoId")
    @Mapping(source = "usuario.id",         target = "usuarioId")
    @Mapping(source = "usuario.nombreReal", target = "nombreUsuario")
    @Mapping(source = "usuario.fotoUsuario", target = "fotoUsuario")
    ComentarioDTO toDTO(Comentario comentario);

    @Mapping(source = "proyectoId", target = "proyecto.id")
    @Mapping(source = "usuarioId",  target = "usuario.id")
    @Mapping(target = "usuario.nombreReal",  ignore = true)
    @Mapping(target = "usuario.fotoUsuario", ignore = true)
    Comentario toEntity(ComentarioDTO comentarioDTO);

    List<ComentarioDTO> toDTO(List<Comentario> comentarios);
    List<Comentario> toEntity(List<ComentarioDTO> comentarioDTOs);
}