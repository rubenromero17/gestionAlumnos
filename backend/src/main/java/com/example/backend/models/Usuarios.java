package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@Entity
@Table(name="usuarios", schema = "")

public class Usuarios {

    @Id
    private Long id;

    @Column(name = "contrasena_hash")
    private String contrasenaHash;

    private String rol;

    @Column(name = "nombre_real")
    private String nombreReal;
}
