package com.example.backend.mapper;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.models.Usuarios;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    Usuarios toEntity (UsuarioDTO usuarioDTO);

    UsuarioDTO toDTO (Usuarios usuario);

    List<UsuarioDTO> toDTO (List<Usuarios> usuarios);

    List<Usuarios> toEntity (List<UsuarioDTO> usuarioDTOS);
}
