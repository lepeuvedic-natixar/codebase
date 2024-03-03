interface DateTimeRangeFilter {
  from: number
  to: number
}

interface GlobalEmissionFilter {
  companies: string[]
  countries: string[]
  categories: string[]
  timeRange: DateTimeRangeFilter
}

interface GlobalFilterState {
  availableValues: GlobalEmissionFilter
  selectedValues: GlobalEmissionFilter
}

export type { DateTimeRangeFilter, GlobalEmissionFilter, GlobalFilterState }
