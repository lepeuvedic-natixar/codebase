import { AppBar, Toolbar, Button, Stack, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFusionAuth } from "@fusionauth/react-sdk";
import LogoMain from 'components/logo/LogoMain';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

const loginBtnStyle = (theme) => ({
  width: '105px',
  height: '44px',
  background: `${theme.palette.success.main}ff`,
  borderRadius: '64px',
  color: 'primary.light',
  fontSize: 16,
  fontFamily: 'Urbanist, sans-serif',
  fontWeight: 'bold',
  transition: 'all .3s',
  '&:hover': {
    backgroundColor: `${theme.palette.success.dark}`, // Lighter with opacity
  },
})

const signupBtnStyle = (theme) => ({
  ...loginBtnStyle(theme),
  backgroundColor: 'common.white',
  '&:hover': {
    backgroundColor: `#ccc`, // Lighter with opacity
  },
})


//          <Button href='/login' variant="contained" color="secondary" sx={signupBtnStyle}>Signup</Button>

const Header = () => {
  const {isAuthenticated, isLoading, login, register} = useFusionAuth();

  return (
    <AppBar position="absolute" elevation={0} sx={{ bgcolor: 'transparent' }}>
      <StyledToolbar>
        <Stack direction="row" spacing={2} alignItems="center">
          <LogoMain />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => login()} variant="contained" color="success" sx={loginBtnStyle}>Login</Button>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
