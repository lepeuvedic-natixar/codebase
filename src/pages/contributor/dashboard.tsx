import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import ClustersMap from 'sections/maps/clusters-map';
import MapContainerStyled from 'components/third-party/map/MapContainerStyled';

import { ThemeMode } from 'types/config';

const mapConfiguration = {
  mapboxAccessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
  minZoom: 1
};

const MAPBOX_THEMES = {
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11'
};

const ContributorDashboardPage = () => {
  const theme = useTheme();

  return (
    // <MainCard title="Sample Card">
    //   <Typography variant="body2">
    //     Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
    //     minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
    //     in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
    //     descent molls anim id est labours.
    //   </Typography>
    // </MainCard>
    <MainCard title="Clusters">
      <MapContainerStyled>
        <ClustersMap {...mapConfiguration} mapStyle={theme.palette.mode === ThemeMode.DARK ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light} />
      </MapContainerStyled>
    </MainCard>
  );
};

export default ContributorDashboardPage;
