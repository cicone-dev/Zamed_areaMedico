import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { generatePrescription } from '../../utils/pdfGenerator'
import { FileText, User, Save, Download, AlertCircle } from 'lucide-react'

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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-800">Nova Prescrição</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-neutral-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Nome do Paciente
            </span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full bg-neutral-50 border-neutral-200 focus:border-primary focus:bg-white transition-all duration-200 ${
              errors.patientName ? 'border-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Digite o nome completo do paciente"
            {...register('patientName', { 
              required: 'Campo obrigatório',
              validate: value => value.trim().length >= 3 || 'Mínimo 3 caracteres'
            })}
          />
          {errors.patientName && (
            <label className="label">
              <span className="label-text-alt text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.patientName.message}
              </span>
            </label>
          )}
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-neutral-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Prescrição Médica
            </span>
          </label>
          <textarea
            className={`textarea textarea-bordered w-full h-32 bg-neutral-50 border-neutral-200 focus:border-primary focus:bg-white transition-all duration-200 resize-none ${
              errors.prescriptionContent ? 'border-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Digite a prescrição completa com medicamentos, dosagens e instruções..."
            {...register('prescriptionContent', { 
              required: 'Campo obrigatório',
              validate: value => value.trim().length >= 10 || 'Mínimo 10 caracteres'
            })}
          />
          {errors.prescriptionContent && (
            <label className="label">
              <span className="label-text-alt text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.prescriptionContent.message}
              </span>
            </label>
          )}
        <button 
          type="submit" 
          className="btn w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 border-none text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="loading loading-spinner loading-sm"></div>
              Processando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              <Download className="w-5 h-5" />
              Salvar e Gerar PDF
            </div>
          )}
        </button>
        </div>
        {errors.root && (
          <div className="alert alert-error">
            <AlertCircle className="w-5 h-5" />
            <span>{errors.root.message}</span>
          </div>
        )}
      </form>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
        <h3 className="font-medium text-neutral-800 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Informações Importantes
        </h3>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li>• A prescrição será salva automaticamente no sistema</li>
          <li>• Um PDF será gerado com QR Code para verificação</li>
          <li>• Todas as prescrições ficam registradas no histórico</li>
        </ul>
      </div>
    </div>
  )
}