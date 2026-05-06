package com.example.backend.mapper;

import com.example.backend.dto.HorariosDTO;
import com.example.backend.models.Horarios;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HorariosMapper {

    Horarios toEntity (HorariosDTO horariosDTO);

    HorariosDTO toDTO (Horarios horarios);

    List<HorariosDTO> toDTO (List<Horarios> horarios);

    List<Horarios> toEntity (List<HorariosDTO> horariosDTO);
}
