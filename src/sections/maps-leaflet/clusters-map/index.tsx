import { FunctionComponent, memo } from "react"
import { Box, Grid, Typography } from "@mui/material";
import ClusteredMap from "components/leaflet-maps/cluster-map"
import EmissionsByCluster from "components/emissions/clusters/EmissionsByCluster";

import { useSelector } from "react-redux";
import { RootState } from "data/store";

const selectSelectedCluster = (state: RootState) => state.selectedCluster

const ClusteredMapSection: FunctionComponent = () => {
  const selectedCluster = useSelector(selectSelectedCluster)
  const thereAreDataPoints = selectedCluster?.dataPoints && selectedCluster?.dataPoints.length > 0

  return (
    <Box style={{ width: '100%', height: '576px', position: "relative" }}>
      <Box style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
      }}>
        <ClusteredMap />
      </Box>
      {thereAreDataPoints &&
        <Box style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: "100%",
          height: "100%"
        }} zIndex={9999}>
          <EmissionsByCluster cluster={selectedCluster} />
        </Box>
      }
    </Box>
  )
}

export default memo(ClusteredMapSection)
