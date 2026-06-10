export interface Stage {
  id: string
  name: string
  sentiment?: string
  need?: string
  clientAction?: string
  passTrigger?: string
  responsible?: string
  sellerRole?: string
  hubspotObject?: string
  hubspotStage?: string
  hubspotFields?: string
  manualActions?: string
  manualActionsUrl?: string
  autoActions?: string
  methodologies?: string[]
  externalTools?: string[]
  internalTools?: string[]
}

export interface Phase {
  id: string
  name: string
  icon: string
  description: string
  lead: string
  stageCount: number
  hubspotObject?: string
  stages: Stage[]
  completeness: 'complete' | 'partial' | 'empty'
  transitionNote?: string
}

export interface Segment {
  id: string
  name: string
  fullName: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  audience: string
  phases: Phase[]
  notionUrl: string
}
