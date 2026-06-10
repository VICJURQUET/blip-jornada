import { smb } from './smb'
import { macc } from './macc'
import { stacc } from './stacc'
import type { Segment } from './types'

export const segments: Segment[] = [smb, macc, stacc]

export function getSegment(id: string): Segment | undefined {
  return segments.find((s) => s.id === id)
}

export function searchAllContent(query: string) {
  const q = query.toLowerCase()
  const results: { segment: Segment; phaseId: string; stageName: string; stageId: string; match: string }[] = []

  for (const segment of segments) {
    for (const phase of segment.phases) {
      for (const stage of phase.stages) {
        const fields = [
          stage.name, stage.sentiment, stage.need, stage.clientAction,
          stage.passTrigger, stage.responsible, stage.sellerRole,
          stage.hubspotStage, stage.hubspotFields, stage.manualActions,
          stage.autoActions, ...(stage.methodologies ?? []),
        ]
        const matchField = fields.find((f) => f?.toLowerCase().includes(q))
        if (matchField) {
          results.push({
            segment,
            phaseId: phase.id,
            stageName: stage.name,
            stageId: stage.id,
            match: matchField,
          })
        }
      }
      // Also search phase name/description
      if (
        phase.name.toLowerCase().includes(q) ||
        phase.description.toLowerCase().includes(q) ||
        phase.lead.toLowerCase().includes(q)
      ) {
        if (!results.find((r) => r.segment.id === segment.id && r.phaseId === phase.id)) {
          results.push({
            segment,
            phaseId: phase.id,
            stageName: phase.name,
            stageId: '',
            match: phase.description,
          })
        }
      }
    }
  }
  return results
}

export { smb, macc, stacc }
export type { Segment }
