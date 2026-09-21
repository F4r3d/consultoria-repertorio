import React, { useState } from 'react';
import { Music, Radio, Disc, UserCheck, Send, CheckCircle2, ArrowRight } from 'lucide-react';

import { Link } from "react-router-dom";
import ItemMusica from './ItemMusica'
import ModalLetra from './ModalLetra'

export default function SossegoLandingPage() {
  const [profile, setProfile] = useState('compositor'); // 'compositor' | 'interprete'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    genero: 'Sertanejo',
    linkAudio: '',
    mensagem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
     
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Radio className="w-4 h-4 animate-pulse" /> Edição Musical Ativa & Pitching
          </span>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white mb-6">
            O ponto de encontro entre o <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Hit inédito</span> e a voz ideal.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A **Sossego** trabalha de forma ativa na curadoria, proteção e pitching de composições. Conectamos autores talentosos a interpretes e produtores em busca do próximo sucesso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cadastro"
              onClick={() => setProfile('compositor')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              Sou Compositor <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#cadastro"
              onClick={() => setProfile('interprete')}
              className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold border border-slate-700 px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Sou Intérprete / Produtor
            </a>
          </div>
        </div>
      </section>

      {/* Proposition - Dual Target Audience */}
      <section id="proposta" className="py-20 px-6 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Feito para quem cria e para quem dá voz</h2>
            <p className="text-slate-400">Uma gestão editorial ativa que gera oportunidades reais para o mercado musical.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Compositor */}
            <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-2xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                <Disc className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Para Compositores</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Suas guias e composições não foram feitas para ficar acumulando poeira no celular. A Sossego faz a gestão das suas obras e realiza o trabalho ativo de pitching para grandes nomes e produtoras.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Pitching ativo para artistas e gravadoras</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Proteção e organização de acervo e direitos</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Transparência na liberação e contrato</li>
              </ul>
            </div>

            {/* Card Interprete */}
            <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-2xl relative overflow-hidden group hover:border-orange-500/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Para Intérpretes & Produtores</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Acelere o processo de repertório do seu próximo projeto, álbum ou single. Acesse uma curadoria exclusiva de faixas inéditas prontas para gravação e com liberação ágil.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Acesso a obras inéditas e exclusivas</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Curadoria direcionada ao seu estilo musical</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Agilidade no processo de cessão de direitos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Como funciona a Edição Ativa</h2>
            <p className="text-slate-400">Do cadastro da guia ao lançamento nas plataformas digitais.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-amber-400 font-bold mx-auto mb-4 text-lg">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">Cadastro e Recebimento</h4>
              <p className="text-slate-400 text-sm">O compositor envia a guia de áudio e letra para a curadoria técnica da Sossego.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-amber-400 font-bold mx-auto mb-4 text-lg">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">Pitching & Apresentação</h4>
              <p className="text-slate-400 text-sm">Nossa equipe apresenta as faixas selecionadas diretamente para produtores e artistas alinhados.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-amber-400 font-bold mx-auto mb-4 text-lg">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">Liberação & Gravação</h4>
              <p className="text-slate-400 text-sm">Formalizamos a liberação editorial com segurança jurídica e transparência para ambas as partes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Registration Section */}
      <section id="cadastro" className="py-20 px-6 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">Faça parte da Sossego</h2>
            <p className="text-slate-400">Selecione seu perfil abaixo e faça seu cadastro inicial.</p>

            {/* Profile Selector Tabs */}
            <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl mt-6">
              <button
                onClick={() => setProfile('compositor')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  profile === 'compositor'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sou Compositor
              </button>
              <button
                onClick={() => setProfile('interprete')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  profile === 'interprete'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sou Intérprete / Produtor
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cadastro recebido com sucesso!</h3>
              <p className="text-slate-300 text-sm">
                Obrigado por se cadastrar como <strong className="capitalize">{profile}</strong>. Nossa equipe entrará em contato via WhatsApp/E-mail em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome ou nome artístico"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Gênero Musical Principal
                  </label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Sertanejo">Sertanejo / MPB</option>
                    <option value="Pop/Urban">Pop / Urbano</option>
                    <option value="Samba/Pagode">Samba / Pagode</option>
                    <option value="Forro">Forró / Axé</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {profile === 'compositor' ? 'Link de demonstração/guia (Drive, Soundcloud, YouTube)' : 'Link do seu trabalho/portfólio'}
                </label>
                <input
                  type="url"
                  name="linkAudio"
                  value={formData.linkAudio}
                  onChange={handleChange}
                  placeholder="https://"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Observações / Recado
                </label>
                <textarea
                  name="mensagem"
                  rows={3}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder={profile === 'compositor' ? 'Fale brevemente sobre o seu estilo de composição...' : 'Descreva o estilo de repertório que você procura...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-5 h-5" /> Enviar Cadastro
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-900 bg-slate-950 text-slate-500 text-sm text-center">
        <p>© {new Date().getFullYear()} **Sossego Edição Ativa & Produção Musical**. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
