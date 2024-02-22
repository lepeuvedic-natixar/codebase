import { FunctionComponent, memo } from "react"
import { LatLngTuple } from "leaflet";
import { Box } from "@mui/material";

import ClusteredMap from "components/leaflet-maps/cluster-map"
import MapContainerStyled from "components/third-party/map/MapContainerStyled";
import { RootState } from "data/store";
import { useSelector } from "react-redux";
import EmissionsByCluster from "components/emissions/clusters/EmissionsByCluster";

const selectSelectedCluster = (state: RootState) => state.selectedCluster

const ClusteredMapSection: FunctionComponent = () => {
  const selectedCluster = useSelector(selectSelectedCluster)
  const thereAreDataPoints = selectedCluster?.dataPoints && selectedCluster?.dataPoints.length > 0

  return (
    <>
      <MapContainerStyled>
        <ClusteredMap />
      </MapContainerStyled>
      { thereAreDataPoints && <EmissionsByCluster cluster={selectedCluster} /> }
    </>
  )
}

export default memo(ClusteredMapSection)
