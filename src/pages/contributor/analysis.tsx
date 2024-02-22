// material-ui
import { Box, Grid, Typography } from "@mui/material"
import { FactoryCard } from "sections/contributor/analysis/FactoryCard"
import MainCard from "components/MainCard"
import { Stack } from "@mui/material"
import EmissionsByYear from "sections/contributor/analysis/EmissionsByYear"

// ==============================|| WIDGET - CHARTS ||============================== //

const ContributorAnalysis = () => {
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Contributor Analysis
      </Typography>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        <Grid item xs={12} md={4}>
          <FactoryCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <MainCard content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h5">Years of data emissions</Typography>
              </Stack>
            </Box>
            <EmissionsByYear />
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}

export default ContributorAnalysis
