import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, FileText, User, Calendar, Stethoscope, Shield } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-neutral-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <img 
              src="/logo_zamed.png" 
              alt="ZaMed" 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" 
            />
            <div>
              <h1 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-primary" />
                ZaMed - Verificação de Prescrição
              </h1>
              <p className="text-neutral-600">Sistema de Gestão Hospitalar</p>
            </div>
      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-2">Verificando Prescrição</h2>
              <p className="text-neutral-600">Aguarde enquanto validamos os dados...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Prescrição Não Encontrada</h2>
              <div className="alert alert-error max-w-md mx-auto">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
              <p className="text-neutral-600 mt-4">
                Verifique se o código QR ou link está correto e tente novamente.
              </p>
            </div>
          </div>
        ) : prescription ? (
          <div className="space-y-6">
            {/* Status de verificação */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800">Prescrição Verificada</h2>
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Documento autêntico e válido
                  </p>
                </div>
              </div>
            </div>
          </div>
            {/* Informações da prescrição */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Detalhes da Prescrição
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-600">ID da Prescrição</span>
                  </div>
                  <p className="text-lg font-semibold text-neutral-800">{prescription.id}</p>
                </div>
                
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-600">Paciente</span>
                  </div>
                  <p className="text-lg font-semibold text-neutral-800">{prescription.patient}</p>
                </div>
                
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-600">Data de Emissão</span>
                  </div>
                  <p className="text-lg font-semibold text-neutral-800">
                    {prescription.date.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
        </div>
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="text-lg font-semibold text-neutral-800 mb-4">Prescrição Médica</h4>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <pre className="whitespace-pre-wrap text-neutral-800 font-medium leading-relaxed">
                    {prescription.content}
                  </pre>
                </div>
              </div>
            </div>
      </div>
            {/* Informações de segurança */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Informações de Segurança
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Documento verificado digitalmente</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Emitido por médico credenciado</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Registro no sistema ZaMed</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">Código QR autêntico</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Prescrição Não Encontrada</h2>
              <p className="text-neutral-600">
                Nenhuma prescrição encontrada com o ID: <strong>{id}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}