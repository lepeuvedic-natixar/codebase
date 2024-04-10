import _ from "lodash"

// The goal of a mapping is to associate the designation of a good in one tool 
// with the designation of the same good in the Natixar SaaS database.
//
// In the database, goods are defined without ambiguity by the following info:
// - customer ID: each customer maintains their own designations. 
//              This information is implicit in the front-end.
// - goodsCode: a code based on the international standard NESH code for goods
//              and the WTO Services Sectorial Classification List for services.
// - precision: a list of keywords that distinguish the good from all others in
//              the context of the customer.
//
// Other tools have widely different ways of designating goods, and may even
// use non-specific, generic designations for groups. Invoices can be really
// vague, for example, even though they are supposed to contain enough 
// information to allow the determination of the correct NESH code.
// In general, tools use a unique identifier, but it may not be externally
// accessible and is therefore optional. They can use one or more fields 
// of descriptive wording, which are concatenated with "|" in a single 
// description field, and of course the tool itself provides the interpretation
// context.
interface CodeMapping {
  id: string
  timestamp: number
  // source tool part
  tool: string
  codeFromTool: string
  description: string
  // our part is optional because we also manipulate incomplete mappings.
  goodsCode?: string
  precision?: string[]
}

const mappingIsFilledFn = (mapping: CodeMapping): boolean => {
  const goodsCodeIsFilled =
    mapping.goodsCode !== undefined && _.trim(mapping.goodsCode).length > 0
  const keywordsAreFilled =
    mapping.precision !== undefined && mapping.precision.length > 0

  return goodsCodeIsFilled && keywordsAreFilled
}

interface GoodsRegistryInfo {
  goodsCode: number
  additionalInformation: string
}

interface MappintToEditContent {
  mappingToEdit: CodeMapping | null
  foundMappings: CodeMapping[]
  informationFromRegistry: GoodsRegistryInfo | null
}

interface IncompleteCodeMappingStorage {
  mappings: CodeMapping[]
  currentIds: string[]
  recentKnownIds: string[]
  mostRecentTimestamp: number
}

export const mappingIsFilled = mappingIsFilledFn
export type { CodeMapping }
export type { GoodsRegistryInfo }
export type { MappintToEditContent }
export type { IncompleteCodeMappingStorage }
