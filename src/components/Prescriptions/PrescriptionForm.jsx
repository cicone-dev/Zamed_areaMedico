import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { generatePrescription } from '../../utils/pdfGenerator'
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Alert,
  CircularProgress
} from '@mui/material'

export default function PrescriptionForm({ onNewPrescription }) {
  const { user } = useAuth()
  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors },
    reset
  } = useForm()

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📝 Nova Prescrição Médica
      </Typography>
      
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
        sx={{ mt: 3 }}
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
  )
}