import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { generatePrescription } from '../../utils/pdfGenerator'
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function PrescriptionForm({ onNewPrescription }) {
  const { user } = useAuth()
  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors },
    reset
  } = useForm()

  const [prescriptions, setPrescriptions] = useState([])

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch('/api/prescriptions')
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`)
        const data = await res.json()
        setPrescriptions(data)
      } catch (err) {
        console.error('[Fetch] Erro ao carregar prescrições:', err)
      }
    }
    fetchPrescriptions()
  }, [])

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient: formData.patientName.trim(),
          content: formData.prescriptionContent.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erro HTTP ${response.status}`)
      }

      const savedPrescription = await response.json()
      
      setPrescriptions(prev => [savedPrescription, ...prev])
      onNewPrescription(savedPrescription)

      await generatePrescription(savedPrescription, {
        name: user?.name || 'Dr. Zamed',
        crm: user?.crm || 'CRM/SP 123456'
      })

      reset()
    } catch (error) {
      console.error('[Formulário] Erro completo:', error)
      alert(`Erro: ${error.message}`)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Card superior */}
      <Card sx={{ mb: 3, backgroundColor: '#0F5E45', borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" color="white" gutterBottom>
            Prescrições recentes
          </Typography>

          {prescriptions.length === 0 ? (
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>
              Nenhuma prescrição encontrada.
            </Typography>
          ) : (
            prescriptions.slice(0, 3).map((p) => (
              <Box key={p.id} sx={{ mt: 1 }}>
                <Typography variant="body2" color="white">
                  {p.patient}
                </Typography>
                <Typography variant="body2" color="white">
                  Data: {new Date(p.date).toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* Formulário */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome do Paciente"
          fullWidth
          margin="normal"
          error={!!errors.patientName}
          helperText={errors.patientName?.message}
          {...register('patientName', { 
            required: 'Campo obrigatório',
            validate: value => value.trim().length >= 3 || 'Mínimo 3 caracteres'
          })}
        />
        
        <TextField
          label="Prescrição Completa"
          multiline
          rows={6}
          fullWidth
          margin="normal"
          error={!!errors.prescriptionContent}
          helperText={errors.prescriptionContent?.message}
          {...register('prescriptionContent', { 
            required: 'Campo obrigatório',
            validate: value => value.trim().length >= 10 || 'Mínimo 10 caracteres'
          })}
        />

        <Button 
          type="submit" 
          variant="contained" 
          disabled={isSubmitting}
          sx={{ 
            mt: 3,
            backgroundColor: '#0F5E45',
            '&:hover': {
              backgroundColor: '#0e7a64',
            }
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : '💾 Salvar e Gerar PDF'}
        </Button>

        {errors.root && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.root.message}
          </Alert>
        )}
      </Box>
    </Box>
  )
}
