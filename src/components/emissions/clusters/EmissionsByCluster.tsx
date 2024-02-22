import { FunctionComponent, memo } from "react"
import L from "leaflet"
import { Typography } from "@mui/material"

interface EmissionsByClusterProps {
    cluster: L.MarkerClusterGroup
}

const EmissionsByClusterTable: FunctionComponent<EmissionsByClusterProps> = ({ cluster }) => {
    return (
        <Typography variant="h2">Hello, I am cluster and my size is {cluster.getChildCount()}</Typography>
    )
}

export default memo(EmissionsByClusterTable)
