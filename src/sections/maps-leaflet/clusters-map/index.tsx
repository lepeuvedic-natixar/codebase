import { FunctionComponent, memo } from "react"
import { Box } from "@mui/material";
import ClusteredMap from "components/leaflet-maps/cluster-map"
import MapContainerStyled from "components/third-party/map/MapContainerStyled";
import EmissionsByCluster from "components/emissions/clusters/EmissionsByCluster";

import { useSelector } from "react-redux";
import { RootState } from "data/store";

const selectSelectedCluster = (state: RootState) => state.selectedCluster

const ClusteredMapSection: FunctionComponent = () => {
  const selectedCluster = useSelector(selectSelectedCluster)
  const thereAreDataPoints = selectedCluster?.dataPoints && selectedCluster?.dataPoints.length > 0

  return (
    <Box>
      <MapContainerStyled>
        <ClusteredMap />
      </MapContainerStyled>
      {thereAreDataPoints && <MapContainerStyled sx={{
        width: "100%",
        position: "relative",
        top: 0,
        left: 0
      }}>
        <EmissionsByCluster cluster={selectedCluster} />
      </MapContainerStyled>}
    </Box>
  )
}

export default memo(ClusteredMapSection)
