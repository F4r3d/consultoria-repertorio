import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Adicionado query e where
import { useSearchParams } from 'react-router-dom'; // Adicionado useSearchParams
import { db } from '../firebase'; // Import do seu db caso necessário

import ItemMusica from './ItemMusica';

function MusicasPage() {
  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 1. Pega o parâmetro "estilo" da URL (?estilo=Rock)
  const [searchParams] = useSearchParams();
  const estiloSelecionado = searchParams.get('estilo');

  const musicasFiltradas = (estiloSelecionado && estiloSelecionado !== 'Todos')
  ? musicas.filter(m => m.estilos?.includes(estiloSelecionado))
  : musicas;

  useEffect(() => {
    async function carregarMusicas() {
      setCarregando(true);
      try {
        const musicasRef = collection(db, 'musicas');

        const q = (estiloSelecionado && estiloSelecionado !== 'Todos')
  ? query(musicasRef, where('estilos', 'array-contains', estiloSelecionado))
  : musicasRef;

        const querySnapshot = await getDocs(q);
        const listaDoBanco = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMusicas(listaDoBanco);
      } catch (error) {
        console.error("Erro ao carregar do Firebase:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarMusicas();
  }, [estiloSelecionado]);


  if (carregando) {
    return <div className="text-slate-100 p-4">Carregando lista de músicas...</div>;
  }

  return (
  /* 1. Div de FORA: Cor da SOBRA/FUNDO DA TELA */
  <div className="w-full min-h-screen bg-slate-950 p-4 md:p-8">

    {/* 2. Div de DENTRO: Cor do BLOCO DO ACERVO */}
    <div className="max-w-8xl mx-auto bg-slate-950 rounded-xl p-4 border border-slate-600">
      
      {/* TÍTULO E CONTADOR */}
      <div className="flex items-center justify-between mb-4 px-3">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
  {estiloSelecionado && estiloSelecionado !== 'Todos' 
    ? `Acervo: ${estiloSelecionado}` 
    : 'Acervo Completo'}
</h2>
        <span className="text-sm text-slate-400">
          {musicasFiltradas.length} {musicasFiltradas.length === 1 ? 'música' : 'músicas'}
        </span>
      </div>

      {/* CABEÇALHO COM A MESMA GRID DO ITEM */}
      <div className="hidden md:grid grid-cols-[80px_250px_minmax(100px,180px)_140px_1fr] items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60 mb-2">
        <div className="text-center">Estilo</div>
        <div>Título</div>
        <div>Autor</div>
        <div>Áudio/Letra</div>
        <div>Tema</div>
      </div>

      {/* LISTA DE MÚSICAS */}
      <div className="flex flex-col">
        {musicasFiltradas.length === 0 ? (
          <p className="text-slate-400 p-4 text-center">Nenhuma música encontrada.</p>
        ) : (
          musicasFiltradas.map(musica => (
            <ItemMusica key={musica.id} {...musica} />
          ))
        )}
      </div>

    </div>

  </div>
);
}

export default MusicasPage;