package com.example.backend.mapper;

import com.example.backend.dto.ProyectosDTO;
import com.example.backend.models.Proyectos;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProyectosMapper {

    Proyectos toEntity (ProyectosDTO proyectosDTO);

    ProyectosDTO toDTO (Proyectos proyectos);

    List<ProyectosDTO> toDTO (List<Proyectos> proyectos);

    List<Proyectos> toEntity (List<ProyectosDTO> proyectosDTO);
}
