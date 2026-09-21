import { Link } from "react-router-dom";
import { Music } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Music className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-slate-100 bg-clip-text text-transparent uppercase">
            Sossego
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#proposta" className="hover:text-amber-400 transition-colors">Para Você</a>
          <a href="#como-funciona" className="hover:text-amber-400 transition-colors">Como Funciona</a>
          <a href="#cadastro" className="hover:text-amber-400 transition-colors">Faça seu Cadastro</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/musicas"
            className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-semibold px-5 py-2.5 rounded-full transition-all duration-200 text-sm"
          >
            Ver Música
          </Link>

          <Link
          to="/submeter"
          className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-semibold px-5 py-2.5 rounded-full transition-all duration-200 text-sm"
          >
          Enviar
          </Link>

          
          <a  href="#cadastro"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-amber-500/20 text-sm"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </header>
  );
}