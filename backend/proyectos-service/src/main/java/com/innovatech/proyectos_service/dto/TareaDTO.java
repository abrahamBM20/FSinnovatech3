package com.innovatech.proyectos_service.dto;

import java.time.LocalDateTime;

public record TareaDTO(
    Long id,
    String titulo,
    String descripcion,
    Long proyectoId,
    Long asignadoA,
    String estado,
    LocalDateTime fechaLimite,
    Integer horasEstimadas
) {}