import { useCallback, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tooltip } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { SettingOutlined } from '@ant-design/icons';
import { ThemeMode } from 'types/config';

// ==============================|| HEADER CONTENT - FULLSCREEN ||============================== //

const Setting = () => {
  const theme = useTheme();

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip title={'Setting'}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{ color: 'text.primary', bgcolor: 'transparent' }}
          aria-label="fullscreen toggler"
        >
          <SettingOutlined/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Setting;
