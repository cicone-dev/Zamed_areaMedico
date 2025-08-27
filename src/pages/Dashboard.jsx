import { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import PrescriptionForm from '../components/Prescriptions/PrescriptionForm'
import { useAuth } from '../contexts/AuthContext'
import { 
  FileText, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  Activity,
  Heart,
  Stethoscope,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function Dashboard() {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  // Dados mockados para demonstração
  const stats = [
    { 
      title: 'Prescrições Hoje', 
      value: '12', 
      icon: FileText, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10',
      trend: '+8%'
    },
    { 
      title: 'Pacientes Ativos', 
      value: '48', 
      icon: Users, 
      color: 'text-secondary', 
      bgColor: 'bg-secondary/10',
      trend: '+12%'
    },
    { 
      title: 'Consultas Agendadas', 
      value: '6', 
      icon: Calendar, 
      color: 'text-tertiary', 
      bgColor: 'bg-tertiary/10',
      trend: '+3%'
    },
    { 
      title: 'Taxa de Sucesso', 
      value: '94%', 
      icon: TrendingUp, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      trend: '+2%'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Background animado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-secondary/5 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-tertiary/5 rounded-full animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
      </div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header da página */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">
                Bem-vindo, Dr. {user?.name || 'Médico'}
              </h1>
              <p className="text-neutral-600">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.title}
              className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6 hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-1">{stat.value}</h3>
              <p className="text-neutral-600 text-sm">{stat.title}</p>
            </div>
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prescrições recentes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-800">Prescrições Recentes</h2>
              </div>
              
              {error && (
                <div className="alert alert-error mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="loading loading-spinner loading-lg text-primary"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {prescriptions.map((p, index) => (
                    <div 
                      key={p.id}
                      className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-800">{p.patient}</h3>
                        <p className="text-sm text-neutral-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(p.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Ativa</span>
                      </div>
                    </div>
                  ))}
                  
                  {prescriptions.length === 0 && !error && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-800 mb-2">Nenhuma prescrição encontrada</h3>
                      <p className="text-neutral-600">Crie sua primeira prescrição usando o formulário ao lado</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          ))}
          {/* Formulário de nova prescrição */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 animate-slide-up">
              <PrescriptionForm onNewPrescription={handleNewPrescription} />
            </div>
          </div>
        </div>
        </div>
        {/* Atividade recente */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-800">Atividade Recente</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">Última Prescrição</h3>
                <p className="text-sm text-neutral-600">Há 2 horas</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">Novo Paciente</h3>
                <p className="text-sm text-neutral-600">Há 4 horas</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-tertiary/5 to-tertiary/10 rounded-xl">
                <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-tertiary" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">Consulta Agendada</h3>
                <p className="text-sm text-neutral-600">Há 6 horas</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}