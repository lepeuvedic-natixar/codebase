interface Location {
    lat: number,
    lon: number,
    country: string
}

interface DataPoint {
    id: string,
    time: number,
    emission_amount: number,
    emission_measure: string,
    category: string,
    company: string,
    location: Location
}

interface ByCompanyDataPoint {
    operation: number,
    upstream: number,
    downstream: number,
    cluster: number,
    company: string
}

interface PerceivedData {
    allPoints: Array<DataPoint>,
    byCompany: Array<ByCompanyDataPoint>,
    byCountry: Array<any>
}

interface DataLayout {
    [key: string]: Array<DataPoint>
}

interface SelectedCluster {
    dataPoints: Array<DataPoint>
}

interface DataSet {
    min_time: number,
    max_time: number,
    data: DataLayout
}

interface EmissionStorage {
    wholeDataSet: DataSet,
    visibleFrame: PerceivedData
}

interface DateFilter {
    from: number,
    to: number
}

export type { DataPoint }
export type { ByCompanyDataPoint }

export type { Location }
export type { PerceivedData }
export type { SelectedCluster }
export type { DataSet }
export type { EmissionStorage }

export type { DateFilter }
