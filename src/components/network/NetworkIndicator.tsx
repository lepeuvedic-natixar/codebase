import { Box, SxProps } from "@mui/material"
import SensorsIcon from "@mui/icons-material/Sensors"
import SensorsOffIcon from "@mui/icons-material/SensorsOff"
import { useGetNetworkInformationQuery } from "data/store/features/networkIndication/NetworkCheckClient"
import { memo } from "react"

const NetworkIndicator = (props: SxProps) => {
  const { ...sxProps } = props
  const { data, error } = useGetNetworkInformationQuery(undefined, {
    pollingInterval: 2000,
  })

  const networkIsOk = data && !error

  return (
    <Box sx={{ ...sxProps }}>
      {networkIsOk ? (
        <SensorsIcon color="success" />
      ) : (
        <SensorsOffIcon color="warning" />
      )}
    </Box>
  )
}

export default memo(NetworkIndicator)
