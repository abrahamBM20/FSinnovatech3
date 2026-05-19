package com.innovatech.proyectos_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateProyectoRequest(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre,
    
    String descripcion,
    
    @NotBlank(message = "El tipo de proyecto es obligatorio (AGIL, TRADICIONAL, HIBRIDO)")
    String tipo,
    
    @NotNull(message = "El responsable es obligatorio")
    Long responsableId,
    
    Double presupuestoAsignado
) {}