import React from 'react';
import { useState, useRef } from 'react';
import ModalLetra from './ModalLetra';
import { Play, Pause, Square, FileText } from 'lucide-react';

const formatarTempo = (tempoEmSegundos) => {
  const minutos = Math.floor(tempoEmSegundos / 60);
  const segundos = Math.floor(tempoEmSegundos % 60);
  const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
  return `${minutos}:${segundosFormatados}`;
};

// Mapeamos os nomes do Firebase (mp3, autores, estilos) mantendo suporte para dados antigos
function ItemMusica({ id, titulo, autor, autores, url, mp3, letra, estilo, estilos, tema }) {

  const [isPlaying, setIsPlaying] = useState(false); 
  const [showLyrics, setShowLyrics] = useState(false);
  const [letraConteudo, setLetraConteudo] = useState('Carregando letra...');

  // Tratamento para garantir a exibição correta de Arrays ou Strings
  const exibicaoAutores = Array.isArray(autores) 
    ? autores.join(', ') 
    : (autor || 'Autor não informado');

  const exibicaoEstilos = Array.isArray(estilos) 
    ? estilos.join(', ') 
    : (estilo || 'Geral');

  const urlAudio = mp3 || url; // Usa mp3 do Firebase ou url do modelo antigo

  // Barra de progresso
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const progressBarRef = useRef(null);
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    setTempoAtual(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuracao(audioRef.current.duration);
  };

  const handleProgressoChange = (e) => {
    const novoTempo = parseFloat(e.target.value); 
    if (audioRef.current) {
      audioRef.current.currentTime = novoTempo;
    }
    setTempoAtual(novoTempo); 
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (!urlAudio) {
      alert("Nenhum arquivo de áudio disponível para esta música.");
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying); 
  };
  
  const handleStop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleToggleLyrics = () => {
    if (!showLyrics) {
      carregarLetra();
    }
    setShowLyrics(!showLyrics);
  };

  const carregarLetra = () => {
    const caminhoLetra = letra; 

    if (!caminhoLetra) {
      setLetraConteudo('Erro: URL da letra não encontrada.');
      return;
    }

    // Busca o texto diretamente do Cloudinary através da URL salva no Firestore
    fetch(caminhoLetra)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao carregar o arquivo: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(texto => {
        setLetraConteudo(texto);
      })
      .catch(error => {
        console.error("Erro ao carregar a letra do Cloudinary:", error);
        setLetraConteudo('Falha ao carregar a letra. Verifique o console ou a URL do arquivo.');
      });
  };

  return (
    <div className="bg-slate-950 border-b border-slate-600 hover:bg-slate-900/50 transition-colors px-3 py-2.5">
      <div className="grid grid-cols-[80px_250px_minmax(100px,180px)_140px_1fr] items-center gap-3">

        {/* Coluna 1: Estilo */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 ring-1 ring-amber-400/30 px-2.5 py-0.5 rounded-full text-center truncate">
          {exibicaoEstilos}
        </span>

        {/* Coluna 2: Música */}
        <span className="text-slate-100 text-sm font-medium truncate">
          {titulo}
        </span>

        {/* Coluna 3: Autor */}
        <span className="text-slate-200 text-xs truncate">
          {exibicaoAutores}
        </span>

        {/* Coluna 4: Player */}
        <div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePlayPause}
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={handleStop}
              className="w-7 h-7 rounded-full text-slate-500 hover:text-amber-400 flex items-center justify-center transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleToggleLyrics}
              className="w-7 h-7 rounded-full text-slate-500 hover:text-amber-400 flex items-center justify-center transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] text-slate-500 tabular-nums shrink-0">
                {formatarTempo(tempoAtual)}
              </span>
              <input
                type="range"
                min="0"
                max={duracao}
                value={tempoAtual}
                ref={progressBarRef}
                onChange={handleProgressoChange}
                className="w-20 h-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 tabular-nums shrink-0">
                {duracao > 0 ? formatarTempo(duracao) : '0:00'}
              </span>
            </div>
          )}
        </div>

        {/* Coluna 5: Tema */}
        <span className="text-slate-200 text-xs truncate">
          {tema || 'N/A'}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={urlAudio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleStop}
      />

      {showLyrics && (
        <ModalLetra
          titulo={titulo}
          conteudo={letraConteudo}
          onClose={handleToggleLyrics}
        />
      )}
    </div>
  );
}

export default ItemMusica;