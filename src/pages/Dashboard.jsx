import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/Layout/Footer'
import { useNavigate, Link } from 'react-router-dom'
import {
  Home,
  FilePlus,
  FileText,
  LogOut,
  UserCircle,
  Activity,
  Calendar,
  Clock,
  ClipboardList
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [horaAtual, setHoraAtual] = useState(new Date())

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const res = await fetch('/api/consultas')
        if (!res.ok) throw new Error('Erro ao carregar consultas')
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error('Formato inválido das consultas')

        // Converte data + hora em Date real
        const consultasProcessadas = data.map(c => {
          const [hora, min] = c.hora?.split(':').map(Number) || [0, 0]
          const [ano, mes, dia] = c.data?.split('-').map(Number) || [0, 0, 0]
          return { ...c, datetime: new Date(ano, mes - 1, dia, hora, min) }
        })

        setConsultas(
          consultasProcessadas.sort((a, b) => a.datetime - b.datetime)
        )
      } catch (err) {
        console.error('[Dashboard] Erro ao buscar consultas:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultas()
    const interval = setInterval(() => setHoraAtual(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Array com os dias da semana
  const diasSemana = [
    "Domingo","Segunda-feira","Terça-feira","Quarta-feira",
    "Quinta-feira","Sexta-feira","Sábado",
  ]
  const diaSemana = diasSemana[horaAtual.getDay()]

  // Saudação dinâmica
  const hora = horaAtual.getHours()
  let saudacao
  if (hora >= 6 && hora < 12) saudacao = 'Bom dia'
  else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde'
  else saudacao = 'Boa noite'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* Sidebar fixa */}
      <aside className="w-72 bg-[#0F5E45] text-white flex flex-col justify-between fixed h-screen shadow-lg animate-slide-in-left">
        <div>
          <div className="flex flex-col items-center justify-center py-8 border-b border-white/20">
            <img src="/logo_zamed.png" alt="ZaMed Logo" className="w-auto h-30 object-contain" />
            <h2 className="mt-4 text-lg font-semibold tracking-wide">ZaMed</h2>
          </div>

          {/* Menu */}
          <nav className="mt-8 px-4 space-y-3">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link to="/nova-consulta" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <FilePlus className="h-5 w-5" /> Nova Consulta
            </Link>
            <Link to="/nova-prescricao" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <FileText className="h-5 w-5" /> Nova Prescrição
            </Link>
          </nav>
        </div>

        {/* Botão de sair */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-[#0F5E45] font-medium hover:bg-gray-200 transition"
          >
            <LogOut className="h-5 w-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="ml-72 flex-1 flex flex-col relative z-10">

        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              {saudacao}, Dr {user?.name || 'Usuário'}
            </h1>     
            <p className="flex font-semibold text-gray-400">{diaSemana}</p>
            <p className="flex items-center font-semibold text-gray-400">
              {horaAtual.toLocaleDateString('pt-BR')} | 
              <Clock className="text-green-700 ml-1 h-4 w-4" /> 
              <span className="text-green-700 ml-1">{horaAtual.toLocaleTimeString('pt-BR')}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UserCircle className="h-9 w-9 text-gray-600" />
            <div className="text-right">
              <p className="text-gray-800 font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">CRM: {user?.crm}</p>
            </div>
          </div>
        </header>

        {/* Conteúdo com cards */}
        <section className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50 to-white animate-fade-in">

          {loading ? (
            <p className="text-gray-500">Carregando consultas...</p>
          ) : error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : consultas.length > 0 ? (
            <>
    <h2 className="text-xl font-bold text-gray-700 mb-6">Últimas Consultas</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultas.slice(0, 3).map((consulta, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="h-6 w-6 text-[#0F5E45]" />
            <h3 className="text-lg font-semibold text-gray-700">{consulta.paciente}</h3>
          </div>
          <p className="text-gray-600"><span className="font-medium">Situação:</span> 
            <span className={`ml-1 ${
              consulta.situacao === 'Sério' ? 'text-red-600 font-bold' :
              consulta.situacao === 'Médio' ? 'text-yellow-600 font-bold' :
              'text-green-600 font-bold'
            }`}>
              {consulta.situacao}
            </span>
          </p>
          <p className="text-gray-600"><Calendar className="inline h-4 w-4 mr-1 text-[#0F5E45]" /> {new Date(consulta.data).toLocaleDateString('pt-BR')}</p>
          <p className="text-gray-600"><Clock className="inline h-4 w-4 mr-1 text-[#0F5E45]" /> {consulta.hora}</p>
          <p className="text-gray-600"><ClipboardList className="inline h-4 w-4 mr-1 text-[#0F5E45]" /> CPF: {consulta.cpf || 'Não informado'}</p>
          <p className="text-gray-600">E-mail: {consulta.email || 'Não informado'}</p>
        </div>
      ))}
    </div>
            </>
          ) : (
            <p className="text-gray-500">Nenhuma consulta encontrada.</p>
          )}
          {/* Estatísticas e informações extras */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Estatísticas Gerais</h3>
              <p className="text-gray-600">
                De acordo com o Ministério da Saúde e dados do próprio sistema ZaMed,
                a digitalização de prescrições reduziu em 28% o tempo médio de atendimento
                em clínicas parceiras como Hospital Galileu Galilei e DMS Burnier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Conformidade com LGPD</h3>
              <p className="text-gray-600">
                Todos os dados são tratados conforme a Lei Geral de Proteção de Dados
                (Lei n° 13.709/2018), garantindo privacidade e segurança em cada etapa
                do fluxo médico-paciente.
              </p>
            </div>

          </div>

          {/* Mais sobre a ZaMed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

            <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Justificativa</h3>
              <p className="text-gray-600">
                O ZaMed surgiu para enfrentar problemas críticos do sistema de saúde
                brasileiro, como longas filas, extravio de documentos e falta de
                medicamentos. Inspirado pela vivência real de um familiar, o projeto
                elimina a dependência de papéis físicos e centraliza processos em
                ambiente digital seguro e acessível.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Público-alvo</h3>
              <p className="text-gray-600">
                O sistema atende pacientes, médicos, enfermeiros, farmacêuticos e
                laboratórios. Garante mais praticidade e segurança aos pacientes,
                reduz tarefas burocráticas para os médicos e aumenta a eficiência de
                clínicas e laboratórios que se integram ao ZaMed.
              </p>
            </div>

          </div>

        </section>

        <Footer />

      </main>
    </div>
  )
}
