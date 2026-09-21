// src/ModalLetra.jsx
import React from 'react';

function ModalLetra({ titulo, conteudo, onClose }) {
  return (
    /* 1. Backdrop (Fundo escurecido que cobre a tela inteira e fixa na posição) */
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      {/* 2. Conteúdo da Caixa do Modal */}
      <div 
        className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-slate-100 truncate pr-4">
            Letra: {titulo}
          </h2>
          <button 
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xl w-8 h-8 flex items-center justify-center transition-colors" 
            onClick={onClose}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>
        
        {/* Corpo com Scroll para letras grandes */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <pre className="whitespace-pre-wrap font-sans text-slate-300 text-base leading-relaxed">
            {conteudo}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ModalLetra;