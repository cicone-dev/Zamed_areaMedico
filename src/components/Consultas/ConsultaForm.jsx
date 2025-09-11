import { useForm } from 'react-hook-form'
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import {  useState } from 'react'

export default function ConsultaForm({ onNewConsulta }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm()

  const [consultas, setConsultas] = useState([])


//  FETCH PARA PEGAR AS CONSULTAS
//   useEffect(() => {
//     const fetchConsultas = async () => {
//       try {
//         const res = await fetch('/api/consultas')
//         if (!res.ok) throw new Error(`Erro HTTP ${res.status}`)
//         const data = await res.json()
//         setConsultas(data)
//       } catch (err) {
//         console.error('[Fetch] Erro ao carregar consultas:', err)
//       }
//     }
//     fetchConsultas()
//   }, [])

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paciente: formData.paciente.trim(),
          data: formData.data,
          hora: formData.hora,
          situacao: formData.situacao, 
          motivo: formData.motivo.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erro HTTP ${response.status}`)
      }

      const savedConsulta = await response.json()

      setConsultas(prev => [savedConsulta, ...prev])
      onNewConsulta(savedConsulta)

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
            Consultas recentes
          </Typography>

          {consultas.length === 0 ? (
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>
              Nenhuma consulta encontrada.
            </Typography>
          ) : (
            consultas.slice(0, 3).map((c) => (
              <Box key={c.id} sx={{ mt: 1 }}>
                <Typography variant="body2" color="white">
                  {c.paciente}
                </Typography>
                <Typography variant="body2" color="white">
                  {c.data} às {c.hora}
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
          error={!!errors.paciente}
          helperText={errors.paciente?.message}
          {...register('paciente', {
            required: 'Campo obrigatório',
            validate: value => value.trim().length >= 3 || 'Mínimo 3 caracteres'
          })}
        />

        <TextField
          type="date"
          label="Data da Consulta"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.data}
          helperText={errors.data?.message}
          {...register('data', { required: 'Campo obrigatório' })}
        />

        <TextField
          type="time"
          label="Hora da Consulta"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.hora}
          helperText={errors.hora?.message}
          {...register('hora', { required: 'Campo obrigatório' })}
        />
 {/* Radio Buttons para situação */}
        <FormControl
          component="fieldset"
          margin="normal"
          error={!!errors.situacao}
          sx={{ mt: 2 }}
        >
          <FormLabel component="legend">Situação da Consulta</FormLabel>
          <RadioGroup row {...register('situacao', { required: 'Campo obrigatório' })}>
            <FormControlLabel value="Bem" control={<Radio />} label="Bem" />
            <FormControlLabel value="Médio" control={<Radio />} label="Médio" />
            <FormControlLabel value="Sério" control={<Radio />} label="Sério" />
          </RadioGroup>
          {errors.situacao && (
            <Typography variant="caption" color="error">
              {errors.situacao.message}
            </Typography>
          )}
        </FormControl>


        <TextField
          label="Motivo da Consulta"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.motivo}
          helperText={errors.motivo?.message}
          {...register('motivo', {
            required: 'Campo obrigatório',
            validate: value => value.trim().length >= 5 || 'Mínimo 5 caracteres'
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
              backgroundColor: '#0e7a64'
            }
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : '💾 Salvar Consulta'}
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
