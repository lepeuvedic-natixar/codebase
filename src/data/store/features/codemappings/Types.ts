interface CodeMapping {
    id: string,
    tool: string,
    codeFromTool: string,
    description: string,
    goodsCode?: string,
    precision?: string[]
}

interface GoodsRegistryInfo {
    goodsCode: number,
    additionalInformation: string
}

interface MappintToEditContent {
    mappingToEdit: CodeMapping | null,
    foundMappings: CodeMapping[],
    informationFromRegistry: GoodsRegistryInfo | null
}

interface IncompleteCodeMappingStorage {
    mappings: CodeMapping[],
    currentIds: string[],
    recentKnownIds: string[]
}

export type { CodeMapping }
export type { GoodsRegistryInfo }
export type { MappintToEditContent }
export type { IncompleteCodeMappingStorage }