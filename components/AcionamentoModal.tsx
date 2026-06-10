'use client'

import { useState } from 'react'

interface Props {
  defaultSegment?: string
  defaultPhase?: string
  onClose: () => void
}

export default function AcionamentoModal({ defaultSegment = '', defaultPhase = '', onClose }: Props) {
  const [type, setType] = useState<'conteudo' | 'ajuda'>('conteudo')
  const [form, setForm] = useState({
    name: '',
    role: '',
    segment: defaultSegment,
    phase: defaultPhase,
    subject: '',
    description: '',
    priority: 'normal',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const typeLabel = type === 'conteudo' ? '📝 Contribuição de Conteúdo' : '🆘 Pedido de Ajuda'
    const priorityLabel = type === 'ajuda' ? `\n• Prioridade: ${form.priority}` : ''
    const message = `${typeLabel}
• Quem: ${form.name} (${form.role})
• Segmento: ${form.segment || 'Geral'}
• Fase: ${form.phase || 'Geral'}
• Assunto: ${form.subject}${priorityLabel}
• Descrição: ${form.description}`

    const slackUrl = `https://slack.com/intl/pt-br/`
    window.open(slackUrl, '_blank')

    navigator.clipboard?.writeText(message).catch(() => {})
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Mensagem preparada!</h3>
          <p className="text-slate-600 mb-2">O Slack foi aberto e a mensagem foi copiada para sua área de transferência.</p>
          <p className="text-sm text-slate-500 mb-6">Cole a mensagem no canal <strong>#revenue-enablement</strong> ou envie diretamente para o responsável.</p>
          <button onClick={onClose} className="bg-blip-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blip-600 transition-colors">
            Fechar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Acionar Revenue Enablement</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
          </div>
          <p className="text-sm text-slate-500 mt-1">Contribua com conteúdo ou peça ajuda sobre a jornada</p>
        </div>

        <div className="p-6">
          {/* Type selector */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setType('conteudo')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                type === 'conteudo'
                  ? 'border-blip-500 bg-blip-50 text-blip-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              📝 Adicionar / melhorar conteúdo
            </button>
            <button
              type="button"
              onClick={() => setType('ajuda')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                type === 'ajuda'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              🆘 Pedir ajuda
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Seu nome *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Victória Jurquet"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Área / Cargo *</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  placeholder="Revenue Enablement"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Segmento</label>
                <select
                  name="segment"
                  value={form.segment}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
                >
                  <option value="">Todos / Geral</option>
                  <option value="SMB">SMB</option>
                  <option value="MAcc">MAcc</option>
                  <option value="StAcc">StAcc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fase</label>
                <select
                  name="phase"
                  value={form.phase}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
                >
                  <option value="">Todas / Geral</option>
                  <option value="Funil Land">Funil Land</option>
                  <option value="Implementação">Implementação</option>
                  <option value="Full Adoption">Full Adoption</option>
                  <option value="Funil Expand">Funil Expand</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Assunto *</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder={type === 'conteudo' ? 'Ex: Adicionar metodologias do Expand no SMB' : 'Ex: Dúvida sobre gatilho de passagem em Negociação'}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
              />
            </div>

            {type === 'ajuda' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Prioridade</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent"
                >
                  <option value="baixa">Baixa — sem urgência</option>
                  <option value="normal">Normal — dentro da semana</option>
                  <option value="alta">Alta — preciso hoje/amanhã</option>
                  <option value="urgente">Urgente — bloqueando processo</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {type === 'conteudo' ? 'O que você quer adicionar ou melhorar? *' : 'Descreva sua dúvida ou problema *'}
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder={
                  type === 'conteudo'
                    ? 'Descreva o conteúdo que falta, a correção necessária ou a melhoria sugerida...'
                    : 'Explique o contexto, o que você já tentou e o que precisa...'
                }
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blip-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
                type === 'conteudo'
                  ? 'bg-blip-500 hover:bg-blip-600'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {type === 'conteudo' ? '📝 Enviar contribuição' : '🆘 Pedir ajuda'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
