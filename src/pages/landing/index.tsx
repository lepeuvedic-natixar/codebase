import React from 'react';
import { Typography, Box, Stack, Link } from '@mui/material';

import { getImageUrl, ImagePath } from "utils/getImageUrl"
import Header from './Header';

const LandingPage: React.FC = () => {
  const bgImgUrl = getImageUrl(`trees-and-sky.jpg`, ImagePath.LANDING);

  const backgroundImageStyle = () => ({
    backgroundImage: `url("${bgImgUrl}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
  });

  const filterStyle = () => ({
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `linear-gradient(320.09deg, rgba(7, 40, 91, 0.28) 25.39%, rgba(3, 34, 71, 0.75) 57.78%, rgba(3, 34, 71, 0.4) 71.71%)`
  })

  const mainContentStyle = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1
  })

  return (
    <Box sx={backgroundImageStyle}>
      <Box sx={filterStyle} />
      <Header />
      <Box sx={mainContentStyle}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h1" component="h1">
            Your Landing Page Title
          </Typography>
          <Typography variant="h5" component="h2">
            A short description of your product or service.
          </Typography>
          <Link href="/about" underline="none" sx={{ color: 'primary.main' }}>
            Learn More
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default LandingPage;
