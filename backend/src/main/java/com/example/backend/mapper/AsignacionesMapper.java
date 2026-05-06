package com.example.backend.mapper;

import com.example.backend.dto.AsignacionesDTO;
import com.example.backend.models.Asignaciones;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AsignacionesMapper {

    Asignaciones toEntity (AsignacionesDTO asignacionesDTO);

    AsignacionesDTO toDTO (Asignaciones asignaciones);

    List<AsignacionesDTO> toDTO (List<Asignaciones> asignaciones);

    List<Asignaciones> toEntity (List<AsignacionesDTO> asignacionesDTOS);
}
