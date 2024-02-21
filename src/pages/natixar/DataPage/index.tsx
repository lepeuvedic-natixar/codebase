import { Box, Grid, Typography } from "@mui/material"
import MainCard from "components/MainCard"

const DataPage = () => (
  <Grid container rowSpacing={4.5} columnSpacing={3}>
    <Grid item xs={12} md={12} xl={12}>
      <Typography variant="h5">Scope Emissions bar</Typography>
    </Grid>
    <Grid item xs={12} md={12} xl={6}>
      <MainCard>
        <Grid item xs={12} md={12} xl={12} />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={12} xl={6}>
      <MainCard>
        <Grid item xs={12} md={12} xl={12} />
      </MainCard>
    </Grid>
  </Grid>
)

export default DataPage
