package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Rol extends JpaRepository<Rol,Long> {
}
