package com.example.backend.mapper;

import com.example.backend.dto.HorariosDTO;
import com.example.backend.models.Horarios;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping; // Necesitas esta importación

import java.util.List;

@Mapper(componentModel = "spring")
public interface HorariosMapper {

    @Mapping(target = "alumnoId", ignore = true)
    Horarios toEntity (HorariosDTO horariosDTO);

    @Mapping(source = "alumnoId.id", target = "alumnoId")
    HorariosDTO toDTO (Horarios horarios);

    List<HorariosDTO> toDTO (List<Horarios> horarios);

    List<Horarios> toEntity (List<HorariosDTO> horariosDTO);
}