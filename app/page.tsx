'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { segments, searchAllContent } from '@/data/index'
import AcionamentoModal from '@/components/AcionamentoModal'

const segmentConfig = {
  smb: {
    gradient: 'from-blue-600 to-blue-500',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    hover: 'hover:border-blue-400',
    ring: 'focus:ring-blue-500',
    icon: '🏢',
    dot: 'bg-blue-500',
  },
  macc: {
    gradient: 'from-purple-600 to-purple-500',
    light: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    hover: 'hover:border-purple-400',
    ring: 'focus:ring-purple-500',
    icon: '🏛️',
    dot: 'bg-purple-500',
  },
  stacc: {
    gradient: 'from-teal-600 to-teal-500',
    light: 'bg-teal-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    hover: 'hover:border-teal-400',
    ring: 'focus:ring-teal-500',
    icon: '🌟',
    dot: 'bg-teal-500',
  },
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return []
    return searchAllContent(query).slice(0, 12)
  }, [query])

  const showResults = query.trim().length >= 2

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blip-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="font-semibold text-slate-800">Jornada 360°</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blip-500 hover:bg-blip-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <span>⚡</span> Acionar
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blip-900 via-blip-800 to-blip-700 text-white py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🗺️</span>
              <span>Guia completo da jornada do cliente Blip 2.0</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Jornada do Cliente 360°
            </h1>
            <p className="text-blip-200 text-lg mb-8 max-w-xl mx-auto">
              Da prospecção ao upsell — processos, gatilhos, metodologias e ferramentas para cada etapa, organizados por unidade de negócio.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden">
                <span className="pl-4 text-slate-400">🔍</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por etapa, metodologia, papel, campo HubSpot..."
                  className="flex-1 px-4 py-3.5 text-slate-800 text-sm focus:outline-none placeholder:text-slate-400"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="pr-4 text-slate-400 hover:text-slate-600 text-lg">
                    &times;
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden text-left z-50 max-h-80 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="px-4 py-6 text-center text-slate-500 text-sm">
                      Nenhum resultado para &ldquo;{query}&rdquo;
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100 text-xs font-medium text-slate-500">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                      </div>
                      {searchResults.map((r, i) => {
                        const cfg = segmentConfig[r.segment.id as keyof typeof segmentConfig]
                        return (
                          <Link
                            key={i}
                            href={`/${r.segment.id}?fase=${r.phaseId}`}
                            onClick={() => setQuery('')}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                          >
                            <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-semibold text-slate-800">{r.segment.name}</span>
                                <span className="text-slate-300">·</span>
                                <span className="text-xs text-slate-600">{r.stageName}</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 truncate">{r.match}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Segment cards */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Escolha a unidade de negócio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {segments.map((seg) => {
              const cfg = segmentConfig[seg.id as keyof typeof segmentConfig]
              const completeFases = seg.phases.filter((p) => p.completeness === 'complete').length
              const partialFases = seg.phases.filter((p) => p.completeness === 'partial').length

              return (
                <Link
                  key={seg.id}
                  href={`/${seg.id}`}
                  className={`group bg-white rounded-2xl border-2 ${cfg.border} ${cfg.hover} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
                >
                  {/* Card header */}
                  <div className={`bg-gradient-to-r ${cfg.gradient} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-3xl mb-2">{cfg.icon}</div>
                        <h3 className="text-2xl font-bold">{seg.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{seg.fullName}</p>
                      </div>
                      <span className="bg-white/20 rounded-lg px-2 py-1 text-xs font-medium">
                        Blip 2.0
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p className="text-xs text-slate-500 mb-4">{seg.description}</p>

                    {/* Phases overview */}
                    <div className="space-y-2 mb-4">
                      {seg.phases.map((phase) => (
                        <div key={phase.id} className="flex items-center gap-2.5">
                          <span className="text-base">{phase.icon}</span>
                          <span className="text-xs text-slate-700 flex-1">{phase.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            phase.completeness === 'complete'
                              ? 'bg-green-100 text-green-700'
                              : phase.completeness === 'partial'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {phase.completeness === 'complete' ? '✓ Completo' : phase.completeness === 'partial' ? '~ Parcial' : '· Em breve'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Audience */}
                    <div className={`rounded-lg px-3 py-2 ${cfg.light}`}>
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Times:</span> {seg.audience}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {completeFases + partialFases}/{seg.phases.length} fases com conteúdo
                      </span>
                      <span className="text-xs font-semibold text-slate-600 group-hover:translate-x-1 transition-transform">
                        Ver jornada →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Quick legend */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">🧭 Como usar este portal</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '🔍', title: 'Busca global', desc: 'Encontre qualquer etapa, metodologia, campo HubSpot ou papel do vendedor em segundos' },
                { icon: '📍', title: 'Jornada visual', desc: 'Explore as 4 fases de cada BU com todas as dimensões: CRM, ações e customer centric' },
                { icon: '💡', title: 'Dicas por etapa', desc: 'Cada etapa tem informações de sentimento do cliente, necessidade e gatilho de passagem' },
                { icon: '⚡', title: 'Acionar', desc: 'Contribua com conteúdo ou peça ajuda ao time de Revenue Enablement via Slack' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Construído por <span className="font-semibold text-slate-700">Victória Jurquet</span> · Revenue Enablement
          </p>
          <p className="text-xs text-slate-400">Blip 2.0 · Jornada 360° · {new Date().getFullYear()}</p>
        </div>
      </footer>

      {showModal && <AcionamentoModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
