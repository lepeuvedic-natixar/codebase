// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// project import
import Filter from './Filter';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';

// types
import { MenuOrientation } from 'types/config';
import Protocol from './Protocol';

// ==============================|| HEADER - CONTENT ||============================== //

const SubHeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Filter />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <Protocol />}
    </>
  );
};

export default SubHeaderContent;
