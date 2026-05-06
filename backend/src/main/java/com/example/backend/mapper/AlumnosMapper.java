package com.example.backend.mapper;

import com.example.backend.dto.AlumnosDTO;
import com.example.backend.models.Alumnos;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlumnosMapper {

    Alumnos toEntity (AlumnosDTO alumnosDTO);

    AlumnosDTO toDTO (Alumnos alumnos);

    List<AlumnosDTO> toDTO (List<Alumnos> alumnos);

    List<Alumnos> toEntity (List<AlumnosDTO> alumnosDTOS);
}
