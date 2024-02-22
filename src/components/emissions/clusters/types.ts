import { DataPoint, SelectedCluster } from "data/store/types/Types"

interface EmissionsByClusterProps {
    cluster: SelectedCluster
}

type DataPointKey = keyof DataPoint

export type { EmissionsByClusterProps }
export type { DataPointKey }