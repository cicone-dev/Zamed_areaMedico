import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthImagePattern from "../components/AuthImagePattern";
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, User, Stethoscope } from 'lucide-react';

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
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full"></div>
        </div>
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo e Header */}
          <div className="text-center animate-fade-in">
            <div className="flex flex-col items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
                <img 
                  src="/logo_zamed.png" 
                  alt="ZaMed Logo" 
                  className="relative w-24 h-24 rounded-full object-cover shadow-2xl ring-4 ring-primary/20 transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-neutral-800 flex items-center gap-2 justify-center">
                  <Stethoscope className="w-8 h-8 text-primary" />
                  ZaMed
                </h1>
                <p className="text-lg font-semibold text-primary">Sistema de Gestão Hospitalar</p>
                <p className="text-neutral-600">Área do Médico</p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-up border border-neutral-200/50">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-neutral-800 mb-2">Acesso ao Sistema</h2>
              <p className="text-neutral-600">Preencha com suas credenciais médicas</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-neutral-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    CRM
                  </span>
                </label>       
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-12 h-12 bg-neutral-50 border-neutral-200 focus:border-primary focus:bg-white transition-all duration-200"
                    placeholder="Digite seu CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-neutral-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                  </span>
                </label> 
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-12 pr-12 h-12 bg-neutral-50 border-neutral-200 focus:border-primary focus:bg-white transition-all duration-200"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}          
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn w-full h-12 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 border-none text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Entrar no Sistema
                  </div>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-500">
                Sistema seguro e confiável para profissionais da saúde
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center text-sm text-neutral-500 animate-fade-in">
            <p>© 2025 ZaMed - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Visual Pattern */}
      <AuthImagePattern
        title="Bem-vindo ao ZaMed!"
        subtitle="Nossa plataforma de gestão hospitalar oferece tecnologia avançada para melhorar o cuidado com seus pacientes e otimizar sua prática médica."
      />
    </div>
  );
};
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                    type="text"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="seu CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                />
              </div>
            </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label> 
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
          <input 
            type={ showPassword ? "text" : "password"}
            className={`input input-bordered w-full pl-10`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}          
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        </div>
      </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
              </>
            ) : (
            "Entrar"
        )}
        </button>
      </form>

                <div className="text-center">
            <p className="text-base-content/60">
              Não tem uma conta?{" "}
              <Link to="/signup" className="link link-primary">
                Criar uma conta
              </Link>
            </p>
          </div>
      </div>
    </div>
     {/* Right Side - Image/Pattern */}
 <AuthImagePattern
        title={"Bem-vindo!"}
        subtitle={"Nosso sistema de gestão hospitalar ajuda a melhorar a qualidade de vida dos pacientes."}
      />
    
    </div>
  );
};
