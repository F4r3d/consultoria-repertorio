import { useNavigate } from 'react-router-dom';

const ESTILOS_DISPONIVEIS = [
  'Rock',
  'MPB',
  'Pop',
  'Samba',
  'Bossa Nova',
  'Infantil',
  'Rap',
  'Reggae',
  'Forró',
  'Brega',
  'Sertanejo',
  'Romântica',
  'Outro',
  'Todos'
];


export function SelecionarEstilo() {
  const navigate = useNavigate();

  const handleSelect = (estilo) => {

    navigate(`/musicas?estilo=${encodeURIComponent(estilo)}`);
  };

  return (
<div className="w-full bg-slate-950 text-white flex flex-col items-center justify-start pt-16 p-6 overflow-hidden">
  <h1 className="text-3xl font-black mb-2 text-center">Escolha o Estilo Musical</h1>
  <p className="text-slate-400 mb-8">Selecione um gênero para navegar pelo acervo</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {ESTILOS_DISPONIVEIS.map((estilo) => (
          <button
            key={estilo}
            onClick={() => handleSelect(estilo)}
            translate="no"
            className="notranslate p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 hover:bg-slate-800 transition-all font-bold text-lg shadow-lg text-amber-400 cursor-pointer"
          >
            {estilo}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelecionarEstilo;