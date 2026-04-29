package com.example.backend.mapper;

import com.example.backend.dto.ModalidadesDTO;
import com.example.backend.models.Modalidades;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ModalidadesMapper {

    Modalidades toEntity (ModalidadesDTO modalidadesDTO);

    ModalidadesDTO toDTO (Modalidades modalidades);

    List<ModalidadesDTO> toDTO (List<Modalidades> modalidades);

    List<Modalidades> toEntity (List<ModalidadesDTO> modalidadesDTO);
}
