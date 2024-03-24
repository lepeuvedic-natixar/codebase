import { useState } from "react"

// material-ui
import { Grid, useTheme, Typography, Box } from "@mui/material"

// project import
import MainCard from "components/MainCard"

import IncomeAreaChart from "sections/dashboard/default/IncomeAreaChart"
import CO2DonutSection from "../../components/natixarComponents/CO2DonutSection"

// assets
import { ChartCard } from "../../components/natixarComponents/ChartCard/ChartCard"
import AcquisitionChart from "../../sections/dashboard/analytics/AcquisitionChart"
import DateFilter from "../../components/DateFilter"
import CloudIcon from "../../assets/images/icons/cloud.svg"

// ==============================|| WIDGET - CHARTS ||============================== //

const NatixarChart = () => {
  const [areaSlot, setAreaSlot] = useState("month")
  const [acquisitionSlot, setAcquisitionSlot] = useState("month")
  const [compare, setCompare] = useState(false)
  const theme = useTheme()

  const styleh5 = () => ({
    marginBottom: "15px",
    color: 'primary.main',
    fontWeight: 'bold',
    fontSize: 24,
    position: 'relative',
  })

  const styleGreenUnderline = () => ({
    width: 'fit-content',
    position: 'relative',
    "&::after": {
      content: '""',
      backgroundColor: theme.palette.success.main,
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: "100%",
      height: '2px',
      borderRadius: 4,
    }
  })

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12} md={12} xl={12}>
        <DateFilter />
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <MainCard sx={{ border: 'none' }}>
          <Typography variant="h5" sx={styleh5}>
            <img src={CloudIcon} alt="Cloud icon" style={{
              "marginRight": 8,
              position: 'relative',
              bottom: -4
            }} />
            <Box
              sx={styleGreenUnderline}
              component="span"
            >Scope Emissions</Box>
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
          compare={compare}
          setCompare={setCompare}
        >
          <AcquisitionChart slot={acquisitionSlot} compare={compare} />
        </ChartCard>
      </Grid>
    </Grid>
  )
}

export default NatixarChart
