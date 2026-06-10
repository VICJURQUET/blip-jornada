'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSegment } from '@/data/index'
import type { Stage, Phase } from '@/data/types'
import AcionamentoModal from '@/components/AcionamentoModal'
import BigModal from '@/components/BigModal'

const phaseColors: Record<string, { bg: string; text: string; border: string; badge: string; line: string }> = {
  land:          { bg: 'bg-blue-500',  text: 'text-blue-600',  border: 'border-blue-200',  badge: 'bg-blue-100 text-blue-700',  line: 'bg-blue-200' },
  implementacao: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', line: 'bg-amber-200' },
  'full-adoption': { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', badge: 'bg-green-100 text-green-700', line: 'bg-green-200' },
  expand:        { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', line: 'bg-purple-200' },
}

const segmentAccent: Record<string, { header: string; btn: string; ring: string }> = {
  smb:   { header: 'from-blue-700 to-blue-500',   btn: 'bg-blue-600 hover:bg-blue-700',   ring: 'ring-blue-500' },
  macc:  { header: 'from-purple-700 to-purple-500', btn: 'bg-purple-600 hover:bg-purple-700', ring: 'ring-purple-500' },
  stacc: { header: 'from-teal-700 to-teal-500',   btn: 'bg-teal-600 hover:bg-teal-700',   ring: 'ring-teal-500' },
}

function StageDrawer({ stage, onClose }: { stage: Stage; onClose: () => void }) {
  const fields = [
    { label: '😊 Sentimento do cliente', value: stage.sentiment, icon: '💭' },
    { label: '🎯 Necessidade', value: stage.need, icon: '🎯' },
    { label: '✋ Ação do cliente', value: stage.clientAction, icon: '✋' },
    { label: '🔑 Gatilho de passagem', value: stage.passTrigger, icon: '🔑' },
    { label: '👤 Responsável', value: stage.responsible, icon: '👤' },
    { label: '📋 Papel do vendedor', value: stage.sellerRole, icon: '📋' },
    { label: '🟣 Objeto HubSpot', value: stage.hubspotObject, icon: '🟣' },
    { label: '🔵 Etapa CRM', value: stage.hubspotStage, icon: '🔵' },
    { label: '📝 Campos HubSpot', value: stage.hubspotFields, icon: '📝' },
    { label: '🤝 Ações Manuais', value: stage.manualActions, icon: '🤝', url: stage.manualActionsUrl },
    { label: '⚡ Ações Automáticas', value: stage.autoActions, icon: '⚡' },
  ].filter((f) => f.value && f.value !== '—')

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{stage.hubspotStage || stage.name}</h3>
            {stage.responsible && (
              <span className="text-xs text-slate-500">Responsável: {stage.responsible}</span>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-1.5">{f.label}</p>
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{f.value}</p>
              {f.url && (
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  🔗 Abrir Briefing no HubSpot
                </a>
              )}
            </div>
          ))}

          {stage.methodologies && stage.methodologies.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2">📚 Metodologias</p>
              <div className="flex flex-wrap gap-2">
                {stage.methodologies.map((m) => (
                  <span key={m} className="bg-blip-100 text-blip-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PhaseSection({ phase, segmentId }: { phase: Phase; segmentId: string }) {
  const [activeStage, setActiveStage] = useState<Stage | null>(null)
  const colors = phaseColors[phase.id] ?? phaseColors['land']

  return (
    <div className="mb-8">
      {/* Phase header */}
      <div className={`rounded-2xl border ${colors.border} bg-white overflow-hidden`}>
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{phase.icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{phase.name}</h3>
                <p className="text-sm text-slate-500">{phase.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                phase.completeness === 'complete'
                  ? 'bg-green-100 text-green-700'
                  : phase.completeness === 'partial'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {phase.completeness === 'complete' ? '✓ Completo' : phase.completeness === 'partial' ? '~ Parcial' : '· Em breve'}
              </span>
              <span className="text-xs text-slate-400">{phase.lead}</span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mt-3">
            {phase.hubspotObject && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                🟣 HubSpot: {phase.hubspotObject}
              </span>
            )}
            {phase.stageCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                📊 {phase.stageCount} etapa{phase.stageCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Stages timeline */}
        {phase.stages.length > 0 ? (
          <div className="p-4 overflow-x-auto scrollbar-thin">
            <div className="flex gap-3 min-w-max pb-2">
              {phase.stages.map((stage, idx) => (
                <div key={stage.id} className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStage(stage)}
                    className="group flex flex-col items-center w-32 text-center"
                  >
                    {/* Step number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2 transition-transform group-hover:scale-110 ${colors.bg}`}>
                      {idx + 1}
                    </div>
                    {/* Stage name */}
                    <span className={`text-xs font-medium ${colors.text} group-hover:underline leading-tight`}>
                      {stage.hubspotStage || stage.name}
                    </span>
                    {/* Responsible badge */}
                    {stage.responsible && (
                      <span className="mt-1 text-xs text-slate-400">{stage.responsible}</span>
                    )}
                    {/* Sentiment chip */}
                    {stage.sentiment && stage.sentiment !== '—' && (
                      <span className={`mt-2 text-xs px-2 py-0.5 rounded-full ${colors.badge} max-w-[120px] truncate`}>
                        {stage.sentiment}
                      </span>
                    )}
                  </button>
                  {/* Connector */}
                  {idx < phase.stages.length - 1 && (
                    <div className={`w-6 h-0.5 flex-shrink-0 ${colors.line}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-slate-400 text-sm">
              {phase.transitionNote
                ? phase.transitionNote
                : 'Conteúdo em desenvolvimento. Use o botão Acionar para contribuir!'}
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Quer ajudar a preencher? Clique em <strong>⚡ Acionar</strong>
            </p>
          </div>
        )}
      </div>

      {activeStage && <StageDrawer stage={activeStage} onClose={() => setActiveStage(null)} />}
    </div>
  )
}

export default function SegmentPage({ params }: { params: { segment: string } }) {
  const [activePhase, setActivePhase] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [openTool, setOpenTool] = useState<'account-planning' | 'forecast' | null>(null)
  const segment = getSegment(params.segment)

  useEffect(() => {
    const url = new URL(window.location.href)
    const fase = url.searchParams.get('fase')
    if (fase) setActivePhase(fase)
  }, [])

  if (!segment) return notFound()

  const acc = segmentAccent[segment.id] ?? segmentAccent['smb']

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1">
              ← Início
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">{segment.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={segment.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-slate-300 transition-colors"
            >
              📄 Ver no Notion
            </a>
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 ${acc.btn} text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors`}
            >
              <span>⚡</span> Acionar
            </button>
          </div>
        </div>
      </header>

      {/* Segment hero */}
      <div className={`bg-gradient-to-r ${acc.header} text-white px-6 py-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">Jornada 360°</p>
              <h1 className="text-3xl font-bold">{segment.name} · {segment.fullName}</h1>
              <p className="text-white/80 mt-2 text-sm">{segment.description}</p>
              <p className="text-white/60 text-xs mt-2">Times: {segment.audience}</p>

              {/* Account Planning & Forecast — MAcc e StAcc only */}
              {(segment.id === 'macc' || segment.id === 'stacc') && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => setOpenTool('account-planning')}
                    className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    🗂️ Account Planning
                  </button>
                  <button
                    onClick={() => setOpenTool('forecast')}
                    className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    📊 Forecast
                  </button>
                </div>
              )}
            </div>

            {/* Phase jump nav */}
            <div className="flex gap-2 flex-wrap">
              {segment.phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePhase(p.id)
                    document.getElementById(`phase-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activePhase === p.id
                      ? 'bg-white text-slate-800'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Journey flow visual */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-thin pb-2">
          {segment.phases.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-2 flex-shrink-0">
              <button
                id={`phase-nav-${p.id}`}
                onClick={() => document.getElementById(`phase-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  phaseColors[p.id]?.badge ?? 'bg-slate-100 text-slate-600'
                } hover:opacity-80`}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
                <span className={`text-xs opacity-60`}>({p.stageCount || '?'})</span>
              </button>
              {idx < segment.phases.length - 1 && (
                <span className="text-slate-300 text-lg">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Phase sections */}
        {segment.phases.map((phase) => (
          <div key={phase.id} id={`phase-${phase.id}`} className="scroll-mt-20">
            <PhaseSection phase={phase} segmentId={segment.id} />
          </div>
        ))}
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

      {showModal && (
        <AcionamentoModal
          defaultSegment={segment.name}
          onClose={() => setShowModal(false)}
        />
      )}

      {openTool === 'account-planning' && (
        <BigModal title="Account Planning" icon="🗂️" onClose={() => setOpenTool(null)}>
          <p className="text-slate-400 text-sm">Conteúdo em breve...</p>
        </BigModal>
      )}

      {openTool === 'forecast' && (
        <BigModal title="Forecast" icon="📊" onClose={() => setOpenTool(null)}>
          <p className="text-slate-400 text-sm">Conteúdo em breve...</p>
        </BigModal>
      )}
    </div>
  )
}
