import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Music, 
  User, 
  Tag, 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  FileAudio,
  Type
} from 'lucide-react';

const ESTILOS_DISPONIVEIS = ['Rock', 'MPB', 'Pop', 'Samba', 'Bossa Nova', 'Rap', 'Reggae', 'Indie', 'Outro'];

export default function Submeter() {
  const [titulo, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [estilos, setEstilos] = useState([]);
  const [tema, setTema] = useState('');
  const [arquivoMp3, setArquivoMp3] = useState(null);
  const [letraTexto, setLetraTexto] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [statusProgresso, setStatusProgresso] = useState('');
  const [erro, setErro] = useState('');
  const [jsonResultado, setJsonResultado] = useState(null);
  const [copiado, setCopiado] = useState(false);

  // Variáveis de ambiente ou substitua aqui
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'SEU_CLOUD_NAME';
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'SEU_UPLOAD_PRESET';

  const handleEstiloChange = (estilo) => {
    if (estilos.includes(estilo)) {
      setEstilos(estilos.filter((e) => e !== estilo));
    } else {
      setEstilos([...estilos, estilo]);
    }
  };

  const gerarNomeArquivo = (str) => {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setErro('');
    if (typeof setSucesso === 'function') setSucesso('');

    if (!titulo.trim() || !letraTexto.trim()) {
      setErro('Os campos Título e Letra/Poema são obrigatórios.');
      return;
    }

    setCarregando(true);

    try {
      let mp3UrlFinal = '';

      // 1. Se o usuário selecionou um arquivo MP3 local, faz o upload para o Cloudinary
      if (arquivoMp3) {
        setStatusProgresso('Enviando arquivo MP3...');
        const formDataMp3 = new FormData();
        formDataMp3.append('file', arquivoMp3);
        formDataMp3.append('upload_preset', UPLOAD_PRESET);

        // Áudios no Cloudinary usam a rota /video/upload
        const resMp3 = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
          method: 'POST',
          body: formDataMp3,
        });

        const dataMp3 = await resMp3.json();

        if (!dataMp3.secure_url) {
          throw new Error(dataMp3.error?.message || 'Falha ao subir o arquivo MP3.');
        }

        mp3UrlFinal = dataMp3.secure_url;
      }

      // 2. Transforma o texto da letra em um arquivo .txt virtual
      setStatusProgresso('Gerando arquivo .txt da letra...');
      const nomeLimpo = gerarNomeArquivo(titulo) || 'letra';
      const blob = new Blob([letraTexto], { type: 'text/plain;charset=utf-8' });
      const arquivoTxt = new File([blob], `${nomeLimpo}.txt`, { type: 'text/plain;charset=utf-8' });

      // 3. Faz o upload da letra (.txt) para a pasta /raw/upload
      const formDataTxt = new FormData();
      formDataTxt.append('file', arquivoTxt);
      formDataTxt.append('upload_preset', UPLOAD_PRESET);

      const resTxt = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
        method: 'POST',
        body: formDataTxt,
      });

      const dataTxt = await resTxt.json();

      if (!dataTxt.secure_url) {
        throw new Error(dataTxt.error?.message || 'Falha ao subir arquivo de texto para o Cloudinary.');
      }

      // 4. Monta o objeto da música
      const novaMusica = {
        titulo: titulo.trim(),
        autores: autores.split(',').map((a) => a.trim()).filter(Boolean),
        estilos,
        tema: tema.trim(),
        mp3: mp3UrlFinal,
        letra: dataTxt.secure_url,
        criadoEm: serverTimestamp() // Ótimo para ordenar as músicas mais recentes!
      };

      // 5. Salva direto na coleção "musicas" do Firebase Firestore
      await addDoc(collection(db, 'musicas'), novaMusica);

      // 6. Sucesso e Limpeza do formulário
      if (typeof setSucesso === 'function') {
        setSucesso('Música e mídias salvas no banco de dados com sucesso!');
      }
      setTitulo('');
      setAutores('');
      setEstilos([]);
      setTema('');
      setArquivoMp3(null);
      setLetraTexto('');

    } catch (err) {
      console.error(err);
      setErro(err.message || 'Ocorreu um erro ao salvar a música.');
    } finally {
      setCarregando(false);
      setStatusProgresso('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 my-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
          <Music className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Cadastrar Nova Obra</h2>
        </div>
      </div>

      <form onSubmit={handleSalvar} className="space-y-5">
        {/* Título & Autores */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
              <Type className="w-4 h-4 text-amber-400" /> Título *
            </label>
            <input
              type="text"
              placeholder="ex: Abstinência"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
              <User className="w-4 h-4 text-amber-400" /> Autor(es)
            </label>
            <input
              type="text"
              placeholder="Separe por vírgula (ex: Fulano, Ciclano)"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Estilos (Checkboxes) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
            <Tag className="w-4 h-4 text-amber-400" /> Estilo(s)
          </label>
          <div className="flex flex-wrap gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            {ESTILOS_DISPONIVEIS.map((estilo) => {
              const selecionado = estilos.includes(estilo);
              return (
                <button
                  type="button"
                  key={estilo}
                  onClick={() => handleEstiloChange(estilo)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    selecionado
                      ? 'bg-amber-500 border-amber-400 text-slate-950 font-semibold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {estilo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tema (Linha Inteira) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
            <FileText className="w-4 h-4 text-amber-400" /> Tema
          </label>
          <input
            type="text"
            placeholder="ex: Reflexão sobre o tempo, Saudade urbana..."
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Upload Arquivo MP3 (Linha Inteira) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
            <FileAudio className="w-4 h-4 text-amber-400" /> Arquivo de Áudio (MP3)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="audio/mp3,audio/*"
              onChange={(e) => setArquivoMp3(e.target.files[0] || null)}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-amber-400 hover:file:bg-slate-700 border border-slate-700 rounded-lg bg-slate-800/50 cursor-pointer"
            />
          </div>
          {arquivoMp3 && (
            <p className="text-xs text-amber-400/80 mt-1">
              Arquivo selecionado: {arquivoMp3.name} ({(arquivoMp3.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Textarea para Letra */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
            <FileText className="w-4 h-4 text-amber-400" /> Letra *
          </label>
          <textarea
            rows="8"
            placeholder="Cole aqui a letra completa..."
            value={letraTexto}
            onChange={(e) => setLetraTexto(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-y"
          />
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          disabled={carregando}
          className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
        >
          {carregando ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>{statusProgresso || 'Processando...'}</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-5 h-5" /> Enviar Mídias e Gerar JSON
            </>
          )}
        </button>
      </form>

      {/* Exibição de Erro */}
      {erro && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      {/* Resultado Final (JSON Pronto) */}
      {jsonResultado && (
        <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle className="w-4 h-4" /> Cadastrado no Cloudinary com Sucesso!
            </span>
            <button
              onClick={copiarJson}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-all border border-slate-700"
            >
              {copiado ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiado ? 'Copiado!' : 'Copiar JSON'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Copie o trecho abaixo para colar no seu array principal de músicas/obras:
          </p>

          <pre className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800">
            {JSON.stringify(jsonResultado, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}