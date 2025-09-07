import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import {
  Home,
  FilePlus,
  FileText,
  LogOut,
  UserCircle,
  Activity,
  Calendar,
  Stethoscope,
  Bell,
  ClipboardList
} from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar fixa */}
      <aside className="w-72 bg-[#0F5E45] text-white flex flex-col justify-between fixed h-screen shadow-lg animate-slide-in-left">
        <div>
          {/* Logo maior */}
          <div className="flex flex-col items-center justify-center py-8 border-b border-white/20">
            <img
              src="/logo_zamed.png"
              alt="ZaMed Logo"
            className="w-auto h-30 object-contain"
            />
            <h2 className="mt-4 text-lg font-semibold tracking-wide">ZaMed</h2>
          </div>

          {/* Menu */}
          <nav className="mt-8 px-4 space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link
              to="/nova-consulta"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <FilePlus className="h-5 w-5" /> Nova Consulta
            </Link>
            <Link
              to="/nova-prescricao"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
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
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 animate-fade-in">
          <h1 className="text-2xl font-semibold text-gray-700">
            Bem-vindo, Dr. {user?.name || 'Usuário'}
          </h1>
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
          {/* Estatísticas principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-[#0F5E45]" />
                <div>
                  <p className="text-gray-500">???????</p>
                  <h2 className="text-3xl font-bold text-gray-800">??</h2>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-[#0F5E45]" />
                <div>
                  <p className="text-gray-500">?????</p>
                  <h2 className="text-3xl font-bold text-gray-800">??</h2>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-8 w-8 text-[#0F5E45]" />
                <div>
                  <p className="text-gray-500">?????</p>
                  <h2 className="text-3xl font-bold text-gray-800">????</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Blocos com mais informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Últimas Consultas */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-slide-in-up">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#0F5E45]" />
                ????????
              </h3>
      
            </div>

            {/* Notificações */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-slide-in-up">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#0F5E45]" />
                ?????
              </h3>
         
            </div>
          </div>

          {/* Espaço extra para rolagem */}
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
        </section>

        {/* Footer */}
        <footer className="bg-white shadow px-6 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ZaMed — Sistema de Gestão Hospitalar.  

        </footer>
      </main>
    </div>
  )
}