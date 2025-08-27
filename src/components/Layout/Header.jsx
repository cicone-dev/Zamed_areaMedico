import { useAuth } from '../../contexts/AuthContext'
+import { LogOut, User, Stethoscope, Bell, Settings } from 'lucide-react'
+import { useNavigate } from 'react-router-dom'
+
+export default function Header() {
+  const { user, logout } = useAuth()
+  const navigate = useNavigate()
+
+  const handleLogout = () => {
+    logout()
+    navigate('/')
+  }
+
+  return (
+    <header className="bg-white shadow-lg border-b border-neutral-200/50 sticky top-0 z-50">
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+        <div className="flex justify-between items-center h-16">
+          {/* Logo e Nome */}
+          <div className="flex items-center gap-4">
+            <div className="flex items-center gap-3">
+              <img 
+                src="/logo_zamed.png" 
+                alt="ZaMed" 
+                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" 
+              />
+              <div>
+                <h1 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
+                  <Stethoscope className="w-5 h-5 text-primary" />
+                  ZaMed
+                </h1>
+                <p className="text-xs text-neutral-500">Sistema de Gestão Hospitalar</p>
+              </div>
+            </div>
+          </div>
+
+          {/* Menu do usuário */}
+          <div className="flex items-center gap-4">
+            {/* Notificações */}
+            <button className="relative p-2 text-neutral-600 hover:text-primary transition-colors rounded-lg hover:bg-neutral-50">
+              <Bell className="w-5 h-5" />
+              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
+            </button>
+
+            {/* Configurações */}
+            <button className="p-2 text-neutral-600 hover:text-primary transition-colors rounded-lg hover:bg-neutral-50">
+              <Settings className="w-5 h-5" />
+            </button>
+
+            {/* Dropdown do usuário */}
+            <div className="dropdown dropdown-end">
+              <div tabIndex={0} role="button" className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
+                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
+                  <User className="w-4 h-4 text-white" />
+                </div>
+                <div className="text-left hidden sm:block">
+                  <p className="text-sm font-medium text-neutral-800">Dr. {user?.name || 'Médico'}</p>
+                  <p className="text-xs text-neutral-500">CRM: {user?.crm || 'N/A'}</p>
+                </div>
+              </div>
+              
+              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-xl border border-neutral-200/50 w-52 p-2 mt-2">
+                <li>
+                  <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
+                    <User className="w-4 h-4" />
+                    Meu Perfil
+                  </a>
+                </li>
+                <li>
+                  <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
+                    <Settings className="w-4 h-4" />
+                    Configurações
+                  </a>
+                </li>
+                <div className="divider my-1"></div>
+                <li>
+                  <button 
+                    onClick={handleLogout}
+                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-red-500"
+                  >
+                    <LogOut className="w-4 h-4" />
+                    Sair do Sistema
+                  </button>
+                </li>
+              </ul>
+            </div>
+          </div>
+        </div>
+      </div>
+    </header>
+  )
+}