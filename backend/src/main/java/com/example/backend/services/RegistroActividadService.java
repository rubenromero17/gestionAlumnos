package com.example.backend.services;

import com.example.backend.dto.RegistroActividadDTO;
import com.example.backend.models.RegistroActividad;
import com.example.backend.repositories.RegistroActividadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistroActividadService {

    private final RegistroActividadRepository registroActividadRepository;

    /**
     * Guarda un nuevo registro de actividad (respuesta o ausencia al popup anti-AFK).
     */
    public RegistroActividad registrar(RegistroActividadDTO dto) {
        RegistroActividad registro = new RegistroActividad();
        registro.setUsuarioId(dto.getUsuarioId());
        registro.setFecha(LocalDate.now());
        registro.setHora(LocalTime.parse(dto.getHora()));
        registro.setRespondido(dto.getRespondido());
        return registroActividadRepository.save(registro);
    }

    /**
     * Devuelve todos los registros de actividad de hoy, ordenados por hora descendente.
     * Usado en home-admin para ver quién respondió y quién estuvo AFK.
     */
    public List<RegistroActividad> getHoy() {
        return registroActividadRepository.findByFechaOrderByHoraDesc(LocalDate.now());
    }

    /**
     * Devuelve los registros de un usuario concreto en una fecha dada.
     */
    public List<RegistroActividad> getPorUsuarioYFecha(Integer usuarioId, String fecha) {
        return registroActividadRepository.findByUsuarioIdAndFecha(
                usuarioId, LocalDate.parse(fecha)
        );
    }
}