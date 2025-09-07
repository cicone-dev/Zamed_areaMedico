import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Box,  Alert,   CircularProgress } from '@mui/material'
import { LogOut } from 'lucide-react' 
import PrescriptionForm from '../components/Prescriptions/PrescriptionForm'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleBack = () => {
  navigate('/dashboard')
  }
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescriptions')
        if (!response.ok) throw new Error('Erro ao carregar prescrições')
        const data = await response.json()
        
        if (!Array.isArray(data)) {
          throw new Error('Formato inválido de dados recebidos')
        }
      } catch (err) {
        console.error('Erro no fetch:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrescriptions()
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

      <PrescriptionForm onNewPrescription={() => {}} />
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