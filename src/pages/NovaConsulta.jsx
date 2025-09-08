import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Alert, CircularProgress } from '@mui/material'
import { LogOut } from 'lucide-react'
import ConsultaForm from '../components/Consultas/ConsultaForm'

export default function NovaConsulta() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await fetch('/api/consultas')
        if (!response.ok) throw new Error('Erro ao carregar consultas')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Formato inválido de dados recebidos')
      } catch (err) {
        console.error('Erro no fetch:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchConsultas()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ConsultaForm onNewConsulta={() => {}} />

      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleBack}
          className="w-auto flex items-center font-bold justify-center gap-2 px-4 py-2 rounded-lg bg-white text-[#0F5E45] hover:bg-gray-200 transition"
        >
          <LogOut className="h-5 w-5" /> Voltar
        </button>
      </div>
    </Box>
  )
}
