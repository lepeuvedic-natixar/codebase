import { Box, Button, Grid, Typography } from "@mui/material"
import MainCard from "components/MainCard"
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons"

import Breadcrumb from "../../../components/@extended/Breadcrumbs"

const ScopePage = () => (
  <MainCard>
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12} md={12} xl={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          padding="10px 0px"
        >
          <Button
            variant="contained"
            sx={{ color: "#FFF", position: "absolute", left: 0, top: 0 }}
            startIcon={<ArrowLeftOutlined color="#FFF" />}
          >
            Back to scopes
          </Button>
          <Breadcrumb
            custom
            title={false}
            separator={RightOutlined}
            sx={{
              mb: "0px !important",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <Typography variant="h5">Scope Emissions bar</Typography>
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        {/* table */}
      </Grid>
    </Grid>
  </MainCard>
)
export default ScopePage
