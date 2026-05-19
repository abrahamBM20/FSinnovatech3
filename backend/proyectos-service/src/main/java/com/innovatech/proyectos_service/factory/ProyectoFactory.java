package com.innovatech.proyectos_service.factory;

import com.innovatech.proyectos_service.enums.TipoProyecto;
import com.innovatech.proyectos_service.model.Proyecto;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * PATRÓN FACTORY METHOD
 * 
 * Problema que resuelve: La creación de proyectos varía significativamente
 * según la metodología (Ágil vs Tradicional). Cada tipo requiere diferentes
 * configuraciones iniciales y reglas de negocio.
 * 
 * Solución: Este Factory centraliza la lógica de creación y aplica
 * configuraciones específicas según el tipo de proyecto.
 */
@Component
public class ProyectoFactory {

    /**
     * Método Factory principal - Crea proyectos según el tipo especificado
     */
    public Proyecto crearProyecto(String nombre, String descripcion, 
                                   String tipoStr, Long responsableId) {
        TipoProyecto tipo = TipoProyecto.valueOf(tipoStr.toUpperCase());
        
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(nombre);
        proyecto.setDescripcion(descripcion);
        proyecto.setTipo(tipo);
        proyecto.setResponsableId(responsableId);
        
        // Aplicar configuraciones específicas según el tipo (Factory Method)
        aplicarConfiguracionPorTipo(proyecto, tipo);
        
        return proyecto;
    }
    
    /**
     * Método Factory con presupuesto personalizado
     */
    public Proyecto crearProyectoConPresupuesto(String nombre, String descripcion,
                                                 String tipoStr, Long responsableId,
                                                 Double presupuesto) {
        Proyecto proyecto = crearProyecto(nombre, descripcion, tipoStr, responsableId);
        proyecto.setPresupuestoAsignado(presupuesto);
        return proyecto;
    }
    
    /**
     * Lógica específica del Factory Method - Configuración según tipo
     */
    private void aplicarConfiguracionPorTipo(Proyecto proyecto, TipoProyecto tipo) {
        LocalDateTime now = LocalDateTime.now();
        proyecto.setFechaInicio(now);
        
        switch (tipo) {
            case AGIL:
                // Proyectos Ágiles: sprints de 2 semanas, entregas rápidas
                proyecto.setFechaFinEstimada(now.plusMonths(3));
                proyecto.setPorcentajeAvance(0);
                break;
                
            case TRADICIONAL:
                // Proyectos Tradicionales: fases largas, planificación detallada
                proyecto.setFechaFinEstimada(now.plusMonths(6));
                proyecto.setPorcentajeAvance(5);  // Planificación inicial
                break;
                
            case HIBRIDO:
                proyecto.setFechaFinEstimada(now.plusMonths(4));
                proyecto.setPorcentajeAvance(2);
                break;
        }
    }
}