export default function Footer() {
  return (
    <footer className="bg-[#0F5E45] text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Institucional */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ZaMed</h3>
          <p className="text-sm opacity-80">
            Sistema de Gerenciamento Hospitalar desenvolvido para médicos,
            clínicas e laboratórios, garantindo agilidade, segurança e
            conformidade com a LGPD.
          </p>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Recursos</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/suporte" className="hover:underline">
                Suporte Técnico
              </a>
            </li>
            <li>
              <a href="/politica-privacidade" className="hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/lgpd" className="hover:underline">
                Termos &amp; LGPD
              </a>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contato</h3>
          <p className="text-sm">Email: suporte@zamed.com</p>
          <p className="text-sm">Plantão: (19) 4002-8922</p>
          <p className="text-sm">Campinas - SP</p>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-white/20 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo_zamed.png" alt="ZaMed Logo" className="h-8" />
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} ZaMed — Todos os direitos reservados
          </p>
        </div>
        <p className="text-xs opacity-70">Versão do Sistema: 1.0.0</p>
      </div>
    </footer>
  )
}