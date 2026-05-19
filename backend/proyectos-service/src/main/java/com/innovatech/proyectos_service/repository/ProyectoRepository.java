package com.innovatech.proyectos_service.repository;

import com.innovatech.proyectos_service.enums.EstadoProyecto;
import com.innovatech.proyectos_service.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    
    Optional<Proyecto> findByNombre(String nombre);
    
    List<Proyecto> findByResponsableId(Long responsableId);
    
    List<Proyecto> findByEstado(EstadoProyecto estado);
    
    @Query("SELECT p FROM Proyecto p WHERE p.porcentajeAvance < 100 AND p.estado != 'COMPLETADO'")
    List<Proyecto> findProyectosEnProgreso();
    
    @Query("SELECT AVG(p.porcentajeAvance) FROM Proyecto p")
    Double getAvancePromedio();
}