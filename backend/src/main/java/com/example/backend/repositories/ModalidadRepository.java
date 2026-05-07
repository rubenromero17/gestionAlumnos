package com.example.backend.repositories;

import com.example.backend.models.Modalidades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModalidadRepository extends JpaRepository<Modalidades,Long> {
}
