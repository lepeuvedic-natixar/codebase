import { createRoot } from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  Link /* , useNavigate */,
} from "react-router-dom"

import { styled, Theme, CSSObject } from "@mui/material/styles"
import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  StackProps,
} from "@mui/material"

import { useWindowSize } from "react-window-size-hooks"
import { getImageUrl, ImagePath } from "utils/getImageUrl"
import Header from "components/landing-page/Header"

import "@fontsource/questrial/400.css"

// project import
import { ConfigProvider } from "contexts/ConfigContext"
// import App from "./App";
import ThemeCustomization from "themes"
import Locales from "components/Locales"
import RTLLayout from "components/RTLLayout"
import ScrollTop from "components/ScrollTop"
import { store } from "data/store"
import { Provider } from "react-redux"

// auth-provider
import { useFusionAuth, FusionAuthProvider } from "@fusionauth/react-sdk"
import { fusionauth_config } from "./config"

// Web vitals
import reportWebVitals from "./reportWebVitals"

const LandingPage: React.FC = () => {
  const { height, width } = useWindowSize()
  const heightThreshold = 930
  const widthThreshold = 1400
  const bgImgUrl = getImageUrl(`trees-and-sky.jpg`, ImagePath.LANDING)
  const pictoEnvironment = getImageUrl(
    `picto-environment.png`,
    ImagePath.LANDING,
  )
  const pictoSocial = getImageUrl(`picto-social.png`, ImagePath.LANDING)
  const pictoGovernance = getImageUrl(`picto-governance.png`, ImagePath.LANDING)

  const backgroundImageStyle = () => ({
    backgroundImage: `url("${bgImgUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    width: "100%",
    maxHeight:
      height >= heightThreshold && width >= widthThreshold ? "100vh" : "100%",
    overflowY:
      height >= heightThreshold && width >= widthThreshold
        ? "hidden"
        : "initial",
  })

  const filterStyle = () => ({
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `linear-gradient(320.09deg, rgba(7, 40, 91, 0.28) 25.39%, rgba(3, 34, 71, 0.75) 57.78%, rgba(3, 34, 71, 0.4) 71.71%)`,
  })

  const mainContentStyle = () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    position: "relative",
    paddingTop: 18,
    paddingBottom: 4,
    zIndex: 1,
  })

  const h2Style = (theme: Theme): CSSObject => ({
    color: "#1DB447",
    fontWeight: "bold",
    fontSize: 44,
  })

  const textStyle = (theme: Theme): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    margin: "auto",
    color: "primary.light",
    fontWeight: "normal",
    position: "relative",
    cursor: "pointer",
    fontSize: 20,
    "&::after": {
      // for animation on hover
      content: '""',
      position: "absolute",
      bottom: "-4px",
      width: "100%",
      height: "0px",
      border: "2px solid #1DB648",
      borderRadius: "4px",
      transform: "scaleX(0)",
      transition: "all .3s",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
  })

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: "#EEF7FF",
    borderRadius: "64px",
    width: "380px",
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "30px",
  }))

  const stackTextStyle: Partial<StackProps> = {
    alignItems: "center",
    direction: "column",
    spacing: 5,
    mt: 6,
  } as const

  const { login } = useFusionAuth()

  return (
    <Box className="landing-page" sx={backgroundImageStyle}>
      <Box sx={filterStyle} />
      <Header />
      <Box sx={mainContentStyle}>
        <Stack gap={18} alignItems="center">
          <Typography
            variant="h1"
            component="h1"
            color="#fff"
            fontWeight="normal"
            textAlign="center"
          >
            Cutting-edge environmental and social impact
            <br />
            management software solutions
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={12}
            justifyContent="center"
          >
            {/* Card Environment */}
            <StyledCard>
              <CardContent>
                <img src={pictoEnvironment} alt="Environment pictogram" />
                <Typography variant="h2" component="h2" sx={h2Style}>
                  Environment
                </Typography>
                <Stack
                  alignItems={stackTextStyle.alignItems}
                  mt={stackTextStyle.mt}
                  direction={stackTextStyle.direction}
                  spacing={stackTextStyle.spacing}
                >
                  <a
                    href="https://co2track.natixar.pro"
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Recommended for security reasons when using target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography component="h3" sx={textStyle} variant="h3">
                      Climate Change
                    </Typography>
                  </a>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Life-cycle Analysis
                  </Typography>

                  <a
                    href="https://blockchain.natixar.pro"
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Recommended for security reasons when using target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography component="h3" sx={textStyle} variant="h3">
                      Trace and Track
                    </Typography>
                  </a>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Green Projects
                  </Typography>
                </Stack>
              </CardContent>
            </StyledCard>
            {/* Card Social */}
            <StyledCard>
              <CardContent>
                <img src={pictoSocial} alt="Social pictogram" />
                <Typography variant="h2" component="h2" sx={h2Style}>
                  Social
                </Typography>
                <Stack
                  alignItems={stackTextStyle.alignItems}
                  mt={stackTextStyle.mt}
                  direction={stackTextStyle.direction}
                  spacing={stackTextStyle.spacing}
                >
                  <Typography component="h3" sx={textStyle} variant="h3">
                    Community impact
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Labor Standards
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Health & Safety
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Customer Responsibility
                  </Typography>
                </Stack>
              </CardContent>
            </StyledCard>
            {/* Card Governance */}
            <StyledCard>
              <CardContent>
                <img src={pictoGovernance} alt="Governance pictogram" />
                <Typography variant="h2" component="h2" sx={h2Style}>
                  Governance
                </Typography>
                <Stack
                  alignItems={stackTextStyle.alignItems}
                  mt={stackTextStyle.mt}
                  direction={stackTextStyle.direction}
                  spacing={stackTextStyle.spacing}
                >
                  <Typography component="h3" sx={textStyle} variant="h3">
                    Tax Transparency
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Anti-corruption
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Shareholders Rights
                  </Typography>

                  <Typography component="h3" sx={textStyle} variant="h3">
                    Risk Management
                  </Typography>
                </Stack>
              </CardContent>
            </StyledCard>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

const router = createBrowserRouter([
  {
    path: "/", // Define the path
    element: <LandingPage />,
  },
])

const App = () => (
  <ThemeCustomization>
    <Provider store={store}>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            <FusionAuthProvider {...fusionauth_config}>
              <RouterProvider router={router} />
            </FusionAuthProvider>
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </Provider>
  </ThemeCustomization>
)

const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
