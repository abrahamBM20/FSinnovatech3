package com.innovatech.proyectos_service.dto;

import com.innovatech.proyectos_service.enums.EstadoProyecto;
import com.innovatech.proyectos_service.enums.TipoProyecto;
import java.time.LocalDateTime;
import java.util.List;

public record ProyectoDTO(
    Long id,
    String nombre,
    String descripcion,
    TipoProyecto tipo,
    EstadoProyecto estado,
    LocalDateTime fechaInicio,
    LocalDateTime fechaFinEstimada,
    Integer porcentajeAvance,
    Double presupuestoAsignado,
    Long responsableId,
    List<TareaDTO> tareas,
    Integer cantidadTareasCompletadas
) {}