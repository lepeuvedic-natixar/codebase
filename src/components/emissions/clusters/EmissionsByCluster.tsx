import { FunctionComponent, memo, useMemo } from "react"
import { Box, Stack, Typography } from "@mui/material"
import EmissionsByClusterTable from "./EmissionsTable"

import { EmissionsByClusterProps } from "./types"
import { formatAmount } from "utils/formatAmounts"

const EmissionsByClusterSection: FunctionComponent<EmissionsByClusterProps> = ({ cluster }) => {
    const totalEmission = useMemo(() => {
        const totalAmount = cluster.dataPoints.reduce((accumulator, currentValue) => accumulator + currentValue.emission_amount, 0)
        return formatAmount(totalAmount)
    }, [cluster])

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
