package com.innovatech.proyectos_service.repository;

import com.innovatech.proyectos_service.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    
    List<Tarea> findByProyectoId(Long proyectoId);
    
    List<Tarea> findByAsignadoA(Long usuarioId);
    
    List<Tarea> findByEstado(String estado);
    
    @Query("SELECT COUNT(t) FROM Tarea t WHERE t.proyecto.id = :proyectoId AND t.estado = 'COMPLETADA'")
    Long countTareasCompletadasByProyecto(Long proyectoId);
}