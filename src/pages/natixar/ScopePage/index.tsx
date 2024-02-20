// material-ui
import { Grid, Typography } from "@mui/material"

// assets
import MainCard from "components/MainCard"

// ==============================|| WIDGET - CHARTS ||============================== //

const ScopePage = () => (
  <Grid container rowSpacing={4.5} columnSpacing={3}>
    <MainCard>
      <Grid item xs={12} md={12} xl={12}>
        {/* head */}
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Scope Emissions bar
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        {/* table */}
      </Grid>
    </MainCard>
  </Grid>
)

export default ScopePage
