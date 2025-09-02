import { useEffect, useState } from 'react'
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Alert, 
  CircularProgress 
} from '@mui/material'
import PrescriptionForm from '../components/Prescriptions/PrescriptionForm'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescriptions')
        if (!response.ok) throw new Error('Erro ao carregar prescrições')
        const data = await response.json()
        
        // Verificação de estrutura dos dados
        if (!Array.isArray(data)) {
          throw new Error('Formato inválido de dados recebidos')
        }
        
        setPrescriptions(data)
      } catch (err) {
        console.error('Erro no fetch:', err)
        setError(err.message)
        setPrescriptions([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrescriptions()
  }, [])

  const handleNewPrescription = (newPrescription) => {
    setPrescriptions(prev => [newPrescription, ...prev])
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, Dr. {user?.name || ''}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" sx={{ mt: 3 }}>
        Prescrições Recentes
      </Typography>
      
      <List>
        {prescriptions.map(p => (
          <ListItem key={p.id}>
            <ListItemText
              primary={p.patient}
              secondary={`Data: ${new Date(p.date).toLocaleDateString('pt-BR')}`}
            />
          </ListItem>
        ))}
        
        {prescriptions.length === 0 && !error && (
          <ListItem>
            <ListItemText
              primary="Nenhuma prescrição encontrada"
              secondary="Crie sua primeira prescrição usando o formulário abaixo"
            />
          </ListItem>
        )}
      </List>

      <PrescriptionForm onNewPrescription={handleNewPrescription} />
    </Box>
  )
}