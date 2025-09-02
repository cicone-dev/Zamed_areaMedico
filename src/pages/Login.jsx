import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'

export default function Login() {
  const [crm, setCrm] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await login(crm, password)
    setLoading(false)

    if (success) {
      navigate('/dashboard')
    } else {
      alert('CRM ou senha inválidos!')
    }
  }

  return (
  <div className="relative h-screen w-full flex items-center justify-center font-sans"> 
   {/* Card verde central */}
       <div 
          className="relative w-full max-w-md rounded-lg shadow-lg p-8"
          style={{
          background: "linear-gradient(346deg, rgba(87,197,155,1) 20%, rgba(119,220,159,1) 47%, rgba(15,94,69,1) 100%)"
  }}
       >
    {/* <div className="relative w-full max-w-md bg-[#0F5E45] rounded-lg shadow-lg p-8"> */}
    {/* <div className="relative w-full max-w-md bg-[#57C59B] rounded-lg shadow-lg p-8"> */}
    {/* <div className="relative w-full max-w-md bg-[#58C59D] rounded-lg shadow-lg p-8">       
    <div className="relative w-full max-w-md bg-[#58C59E] rounded-lg shadow-lg p-8">        */}
       
   

       {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <img
            src="/logo_zamed.png"
            alt="Logo ZaMed"
            className="w-auto h-30 object-contain"
          />
          <h1 className="text-2xl font-semibold text-white tracking-wide">
            Área do Médico
          </h1>
          <p className="text-sm text-white/90">Preencha com seus dados</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CRM */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">CRM</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 bg-transparent border-white text-white placeholder-white/70 focus:outline-none"
                placeholder="Seu CRM"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-medium">Senha</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input input-bordered w-full pl-10 bg-transparent border-white text-white placeholder-white/70 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white" />
                ) : (
                  <Eye className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Botão */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-sm font-medium btn h-6 w-50 rounded-full bg-white text-[#0F5E45] border-none hover:bg-[#0F5E45] hover:text-white transition"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>

        {/* Link para signup */}
        <div className="text-center mt-6">
          <p className="text-white/90 font-medium">
            Não tem uma conta?{' '}
            <Link to="/signup" className="link text-[#0F5E45] hover:text-gray-200 font-medium">
              Criar uma conta
            </Link>
          </p>
        </div>
      </div>

      {/* Texto institucional fora do card */}
      <div className="absolute bottom-6 right-6 max-w-xs text-right">
        <p className="text-[#0F5E45] text-sm font-medium">
          ZaMed — Sistema de Gestão Hospitalar que conecta médicos,
          pacientes e laboratórios de forma rápida, segura e moderna.
        </p>
      </div>
    </div>
  )
}
