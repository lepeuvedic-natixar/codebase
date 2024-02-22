import { useTheme } from "@mui/material/styles"
import MainCard from "components/MainCard"
import LeafletMap from "sections/maps-leaflet/clusters-map"
import MapContainerStyled from "components/third-party/map/MapContainerStyled"

import ByCompanySection from "sections/charts/emissions/ByCompanySection"
import ByCountrySection from "sections/charts/emissions/ByCountrySection"
import { Stack, Typography } from "@mui/material"

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

const ContributorDashboardPage = () => {
  const theme = useTheme()

  return (
    <Stack spacing={4}>
      <Typography variant="h4" gutterBottom>
        Map
      </Typography>
      <MapContainerStyled>
        <LeafletMap allPoints={[]} />
      </MapContainerStyled>
      <ByCompanySection />
      <ByCountrySection />
    </Stack>
  )
}

export default ContributorDashboardPage
