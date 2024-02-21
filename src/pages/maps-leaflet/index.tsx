import { useTheme } from "@mui/material/styles"
import MainCard from "components/MainCard"
import LeafletMap from "sections/maps-leaflet/clusters-map"
import MapContainerStyled from "components/third-party/map/MapContainerStyled"

import EmissionByCompany from "sections/charts/emissions/EmissionByCompany"
import { useSelector } from "react-redux"
import { RootState } from "data/store"
import { ByCompanyDataPoint } from "data/store/types/Types"
import EmissionByCountry from "sections/charts/emissions/EmissionByCountry"

const mapConfiguration = {
  mapboxAccessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
  minZoom: 1,
}

const MAPBOX_THEMES = {
  light: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
  streets: "mapbox://styles/mapbox/streets-v11",
  outdoors: "mapbox://styles/mapbox/outdoors-v11",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
}

const selectByCompany = (state: RootState) => state.coordinates.visibleFrame.byCompany
const selectByCountry = (state: RootState) => state.coordinates.visibleFrame.byCountry

const ContributorDashboardPage = () => {
  const theme = useTheme()
  const byCompany: ByCompanyDataPoint[] = useSelector(selectByCompany)
  const byCountry: ByCompanyDataPoint[] = useSelector(selectByCountry)

  return (
    <MainCard title="Clusters">
      <MapContainerStyled>
        <LeafletMap allPoints={[]} />
      </MapContainerStyled>
      <MapContainerStyled><EmissionByCompany emissionData={byCompany} /></MapContainerStyled>
      <MapContainerStyled><EmissionByCountry emissionData={byCountry} /> </MapContainerStyled>
    </MainCard>
  )
}

export default ContributorDashboardPage
