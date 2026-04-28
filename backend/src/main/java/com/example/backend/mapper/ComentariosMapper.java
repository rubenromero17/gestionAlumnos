package com.example.backend.mapper;

import com.example.backend.dto.ComentariosDTO;
import com.example.backend.models.Horarios;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HorariosMapper {

    Comentarios toEntity (ComentariosDTO comentariosDTO);

    Comentarios toDTO (Comentarios comentarios);

    List<ComentariosDTO> toDTO (List<Comentarios> comentarios);

    List<Comentarios> toEntity (List<ComentariosDTO> comentariosDTO);
}
