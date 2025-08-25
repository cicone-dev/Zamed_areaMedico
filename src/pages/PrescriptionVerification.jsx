import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material'

export default function PrescriptionVerification() {
  const { id } = useParams()
  const [prescription, setPrescription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        console.log('[Verificação] Buscando prescrição ID:', id)
        const response = await fetch(`/api/prescriptions/${id}`)
        const data = await response.json()

        console.log('[Verificação] Resposta completa:', { 
          status: response.status,
          data
        })

        
        if (response.status === 404) {
          throw new Error(data.error || 'Prescrição não encontrada')
        }

        
        console.log('[Verificação] Tipos dos campos:', {
          id: typeof data.id,
          patient: typeof data.patient,
          content: typeof data.content,
          date: typeof data.date
        })

        
        const requiredStructure = {
          id: 'string',
          patient: 'string',
          content: 'string',
          date: 'string'
        }

        const validationErrors = []
        for (const [field, type] of Object.entries(requiredStructure)) {
          if (!(field in data) || typeof data[field] !== type) {
            validationErrors.push(`${field} (esperado ${type}, recebido ${typeof data[field]})`)
          }
        }

        if (validationErrors.length > 0) {
          throw new Error(`Dados inválidos. Problemas em: ${validationErrors.join(', ')}`)
        }

        
        const dateObj = new Date(data.date)
        if (isNaN(dateObj.getTime())) {
          throw new Error('Formato de data inválido na prescrição')
        }

        
        setPrescription({
          ...data,
          date: dateObj
        })

      } catch (error) {
        console.error('[Verificação] Erro detalhado:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrescription()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : prescription ? (
        <>
          <Typography variant="h4" gutterBottom>
            ✅ Prescrição Verificada
          </Typography>

          <Typography variant="h6" gutterBottom>
            ID: {prescription.id}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Paciente: {prescription.patient}
          </Typography>

          <Typography gutterBottom>
            Data: {prescription.date.toLocaleDateString('pt-BR')}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Prescrição Médica:
          </Typography>

          <Typography 
            component="div"
            sx={{ 
              whiteSpace: 'pre-wrap',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {prescription.content}
          </Typography>
        </>
      ) : (
        <Alert severity="warning">
          Nenhuma prescrição encontrada com o ID: {id}
        </Alert>
      )}
    </Paper>
  )
}