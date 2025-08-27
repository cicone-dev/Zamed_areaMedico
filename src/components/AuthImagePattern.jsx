const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden gradient-bg">
      <div className="floating-shapes"></div>
      
      <div className="relative z-10 max-w-lg text-center text-white p-12">
        {/* Padrão de elementos médicos */}
        <div className="grid grid-cols-4 gap-4 mb-12 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-white/20 backdrop-blur-sm 
                ${i % 4 === 0 ? 'animate-pulse-slow' : ''}
                ${i % 3 === 0 ? 'animate-float' : ''}
                transition-all duration-500 hover:bg-white/30`}
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            >
              {/* Ícones médicos sutis */}
              <div className="w-full h-full flex items-center justify-center">
                {i % 5 === 0 && <div className="w-6 h-6 border-2 border-white rounded-full"></div>}
                {i % 5 === 1 && <div className="w-6 h-1 bg-white rounded-full"></div>}
                {i % 5 === 2 && <div className="w-1 h-6 bg-white rounded-full"></div>}
                {i % 5 === 3 && <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>}
              </div>
            </div>
          ))}
        </div>
        
        {/* Conteúdo principal */}
        <div className="animate-fade-in">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg opacity-90 leading-relaxed">
            {subtitle}
          </p>
          
          {/* Elementos decorativos */}
          <div className="mt-8 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Elementos flutuantes adicionais */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '-3s' }}></div>
    </div>
  );
};

export default AuthImagePattern;
