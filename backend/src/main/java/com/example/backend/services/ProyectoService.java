package com.example.backend.services;

import com.example.backend.dto.ProyectosDTO;
import com.example.backend.mapper.ProyectosMapper;
import com.example.backend.models.Proyectos;
import com.example.backend.repositories.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private ProyectosMapper proyectosMapper;

    public List<ProyectosDTO> findAll() {
        return proyectoRepository.findAll().stream().map(proyectosMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<ProyectosDTO> findById(Long id) {
        return proyectoRepository.findById(id).map(proyectosMapper::toDTO);
    }
}
