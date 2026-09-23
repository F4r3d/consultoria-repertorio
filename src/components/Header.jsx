import { useState } from "react";
import { Music, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

 return (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-6 py-4 md:h-20 md:py-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">

      {/* Linha 1: Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer self-start md:self-auto"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
          <Music className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-slate-100 bg-clip-text text-transparent uppercase">
          Sossego
        </span>
      </Link>

      {/* Linha 2: Nav */}
      <nav className="flex items-center justify-center gap-5 md:gap-8 text-xs md:text-sm font-medium text-slate-300">
        <a href="#proposta" className="hover:text-amber-400 transition-colors">Para Você</a>
        <a href="#como-funciona" className="hover:text-amber-400 transition-colors">Como Funciona</a>
        <a href="#cadastro" className="hover:text-amber-400 transition-colors">Faça seu Cadastro</a>
      </nav>

      {/* Linha 3: Botões */}
      <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4">
        <Link
          to="/estilos"
          className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 text-xs md:text-sm"
        >
          Músicas
        </Link>

        <Link
          to="/submeter"
          className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 text-xs md:text-sm"
        >
          Enviar
        </Link>

        
          <a href="#cadastro"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-200 shadow-md shadow-amber-500/20 text-xs md:text-sm"
        >
          Cadastre-se
        </a>
      </div>
    </div>
  </header>
);


}