import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthImagePattern from "../components/AuthImagePattern";
import { Link, useNavigate } from 'react-router-dom'
import {  Eye, EyeOff, Loader2, Lock, Mail} from 'lucide-react';

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
    <div className="h-screen grid lg:grid-cols-2">
    {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div >
              <img src="/logo_zamed.png" alt="Logo" className="w-70 h-auto rounded-full object-cover" />
            </div>
            <h1 className=" text-2xl font-bold mt-2">Área do Medico</h1>
            <p className="text-base-content/60">Preencha com seus dados:</p>
          </div>
        </div>
      
      {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">CRM</span>
              </label>       
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
