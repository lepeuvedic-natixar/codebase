import { useState } from "react"

// material-ui
import { Grid, Typography } from "@mui/material"
import { FactoryCard } from "sections/contributor/analysis/FactoryCard"

// ==============================|| WIDGET - CHARTS ||============================== //

const ContributorAnalysis = () => {
  const [areaSlot, setAreaSlot] = useState("month")
  const [acquisitionSlot, setAcquisitionSlot] = useState("month")

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
          {/* <FactoryCard /> */}
        </Grid>
        {/* <Grid item xs={12} md={12} xl={12}>
        <MainCard>
          <Typography variant="h5" sx={{ marginBottom: "15px" }}>
            Scope Emissions
          </Typography>
          <CO2DonutSection />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ChartCard
          title="Total Emissions"
          value="12,900 CO2 (t)"
          date="01 Dec - 31 Feb 2021"
          slot={areaSlot}
          setSlot={setAreaSlot}
        >
          <IncomeAreaChart slot={areaSlot} />
        </ChartCard>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ChartCard
          title="Trend stacked bars CO2"
          value="12,900 CO2 (t)"
          date="01 Dec - 08 Jan 2022"
          slot={acquisitionSlot}
          setSlot={setAcquisitionSlot}
          compareButton
        >
          <AcquisitionChart slot={acquisitionSlot} />
        </ChartCard>
      </Grid> */}
      </Grid>
    </>
  )
}

export default ContributorAnalysis
