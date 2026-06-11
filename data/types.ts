export interface SellerRoleBlock {
  type: 'section' | 'checklist' | 'fields' | 'categories' | 'cta'
  title: string
  subtitle?: string
  items?: string[]
  fields?: { label: string; indent?: boolean }[]
  url?: string
  categories?: {
    name: string
    color: string
    description: string
    examples: string
  }[]
}

export interface Stage {
  id: string
  name: string
  sentiment?: string
  need?: string
  clientAction?: string
  passTrigger?: string
  responsible?: string
  sellerRole?: string
  sellerRoleBlocks?: SellerRoleBlock[]
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
