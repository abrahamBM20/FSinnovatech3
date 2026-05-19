import { useState } from 'react'

function ProyectoForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    tipo: initialData?.tipo || 'AGIL',
    responsableId: initialData?.responsableId || 1,
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (formData.nombre.length > 100) newErrors.nombre = 'Máximo 100 caracteres'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(formData)
  }

  const tipos = [
    { value: 'AGIL', label: 'Ágil (Scrum/Kanban)', icon: '🔄', description: 'Entregas iterativas cada 2-3 semanas' },
    { value: 'TRADICIONAL', label: 'Tradicional (Waterfall)', icon: '📊', description: 'Fases secuenciales y planificación detallada' },
    { value: 'HIBRIDO', label: 'Híbrido', icon: '🔀', description: 'Combinación de metodologías' },
  ]

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0a2540', margin: 0 }}>
          {initialData ? '✏️ Editar Proyecto' : '✨ Nuevo Proyecto'}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>
            Nombre del proyecto *
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ej: Innovatech Cloud Migration"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: errors.nombre ? '2px solid #ef4444' : '1px solid #cbd5e1',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          {errors.nombre && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.nombre}</div>}
        </div>

        {/* Campo Descripción */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>
            Descripción
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Describe el objetivo y alcance del proyecto..."
            rows="3"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Campo Tipo de proyecto */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>
            Metodología *
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tipos.map((tipo) => (
              <label
                key={tipo.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: formData.tipo === tipo.value ? '2px solid #0a2540' : '1px solid #cbd5e1',
                  background: formData.tipo === tipo.value ? '#f0f4f8' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="radio"
                  name="tipo"
                  value={tipo.value}
                  checked={formData.tipo === tipo.value}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  style={{ marginRight: '12px' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>
                    <span style={{ marginRight: '8px' }}>{tipo.icon}</span>
                    {tipo.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{tipo.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '12px',
              border: 'none',
              background: '#0a2540',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {initialData ? 'Guardar cambios' : 'Crear proyecto'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProyectoForm