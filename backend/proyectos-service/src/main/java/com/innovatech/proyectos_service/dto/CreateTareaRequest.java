package com.innovatech.proyectos_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record CreateTareaRequest(
    @NotBlank(message = "El título es obligatorio")
    String titulo,
    
    String descripcion,
    
    @NotNull(message = "El ID del proyecto es obligatorio")
    Long proyectoId,
    
    Long asignadoA,
    
    LocalDateTime fechaLimite,
    
    Integer horasEstimadas
) {}