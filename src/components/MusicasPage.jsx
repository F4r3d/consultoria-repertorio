import { useState, useEffect } from 'react';
import ItemMusica from './ItemMusica';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Verifique se o caminho para o seu arquivo do Firebase está correto

function MusicasPage() {
  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMusicas() {
      try {
        const querySnapshot = await getDocs(collection(db, 'musicas'));
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
  }, []);

  if (carregando) {
    return <div className="text-slate-100 p-4">Carregando lista de músicas...</div>;
  }

  return (
    /* 1. Div de FORA: Cor da SOBRA/FUNDO DA TELA */
    <div className="w-full min-h-screen bg-slate-950 p-4 md:p-8">

      {/* 2. Div de DENTRO: Cor do BLOCO DO ACERVO */}
      <div className="max-w-8xl mx-auto bg-slate-950 rounded-xl p-4 border border-slate-600">
        
        <h2 className="text-xl font-bold text-slate-100 tracking-tight mb-4 px-3">
          Acervo Completo
        </h2>

        <div className="flex flex-col">
          {musicas.map(musica => (
            <ItemMusica key={musica.id} {...musica} />
          ))}
        </div>

      </div>

    </div>
  );
}

export default MusicasPage;