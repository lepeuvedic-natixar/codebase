import { useState } from "react"

// material-ui
import { Grid, useTheme, Typography, Box } from "@mui/material"

// project import
import MainCard from "components/MainCard"

import CO2DonutSection from "../../components/natixarComponents/CO2DonutSection"

// assets
import { ChartCardCopy } from "../../components/natixarComponents/ChartCard/ChartCardCopy"
// import { ChartCard } from "../../components/natixarComponents/ChartCard/ChartCard"
import AcquisitionChart from "../../sections/dashboard/analytics/AcquisitionChart"
import DateFilter from "../../components/DateFilter"
import { NatixarTitleCard } from "components/natixarComponents/ChartCard/NatixarTitleCard"

// ==============================|| WIDGET - CHARTS ||============================== //

const NatixarChart = () => {
  const [acquisitionSlot, setAcquisitionSlot] = useState("month")
  const [compare, setCompare] = useState(false)

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12} md={12} xl={12}>
        <DateFilter />
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <MainCard sx={{ border: 'none' }}>
          <NatixarTitleCard>Scope Emissions</NatixarTitleCard>
          <CO2DonutSection />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ChartCardCopy
          title="Trend stacked bars CO2"
          value="12,900 CO2 (t)"
          date="01 Dec - 08 Jan 2022"
          slot={acquisitionSlot}
          setSlot={setAcquisitionSlot}
          compareButton
          compare={compare}
          setCompare={setCompare}
        >
          <AcquisitionChart slot={acquisitionSlot} compare={compare} />
        </ChartCardCopy>
      </Grid>
    </Grid>
  )
}

export default NatixarChart
