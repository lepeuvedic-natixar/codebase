import { FunctionComponent, memo, useMemo } from "react"
import { Box, Stack, Typography } from "@mui/material"
import EmissionsByClusterTable from "./EmissionsTable"

import { EmissionsByClusterProps } from "./types"

const EmissionsByClusterSection: FunctionComponent<EmissionsByClusterProps> = ({ cluster }) => {
    const totalEmission = useMemo(() =>
        cluster.dataPoints.reduce((accumulator, currentValue) => accumulator + currentValue.emission_amount, 0)
        , [cluster])

    return (
        <Stack direction="column">
            <Typography variant="h2">TOTAL: {totalEmission}</Typography>
            <Box style={{ height: 400, width: '100%' }}>
                <EmissionsByClusterTable cluster={cluster} />
            </Box>
        </Stack>

    )
}

export default memo(EmissionsByClusterSection)
